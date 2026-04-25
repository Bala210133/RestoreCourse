import { Box, Button, Checkbox, FormControlLabel, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Review from "./Review";
import { useFetchAddressQuery, useUpdateUserAddressMutation } from "../account/accountApi";
import type { Address } from "../../App/models/user";
import type { ConfirmationToken, StripeAddressElementChangeEvent, StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { useBasket } from "../../lib/hooks/useBakset";
import { currencyFormat } from "../../lib/util";
import { toast } from "react-toastify/unstyled";
import { LoadingButton } from "@mui/lab";
import { useCreateOrderMutation } from "../orders/orderApi";


const steps = ['Address', 'Payment', 'Review'];

export default function CheckoutStepper() {

    const [activestep, setActiveStep] = useState(0);
    const [createOrder] = useCreateOrderMutation();
    const { basket } = useBasket();
    const { data: { name, ...restAddress } = {} as Address, isLoading } = useFetchAddressQuery();
    const [updateAddress] = useUpdateUserAddressMutation();
    const [saveAddressChecked, setSaveAddressChecked] = useState(false);
    const elements = useElements();
    const stripe = useStripe();
    const [addressComplete, setAddressComplete] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);
    const { total, clearBasket } = useBasket();
    const navigate = useNavigate();
    const [confirmationToken, setConfirmationToken] = useState<ConfirmationToken | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const confirmPayment = async () => {
        setSubmitting(true);
        try {
            if (!confirmationToken || !basket?.clientSecret) throw new Error('Unable to process payment');

            const paymentResult = await stripe?.confirmPayment({
                clientSecret: basket.clientSecret,
                redirect: 'if_required',
                confirmParams: {
                    confirmation_token: confirmationToken.id
                }
            });

            if (paymentResult?.error) {
                throw new Error(paymentResult.error.message);
            }

            if (paymentResult?.paymentIntent?.status === 'succeeded') {
                const orderModel = await createOrderModel();
                const orderResult = await createOrder(orderModel);
                navigate('/checkout/success', { state: orderResult });
                clearBasket();
            } else {
                throw new Error('Something went wrong');
            }
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            setActiveStep(step => step - 1);
        } finally {
            setSubmitting(false);
        }
    };

    const createOrderModel = async () => {
        const shippingAddress = await getStripeAddress();
        const paymentSummary = confirmationToken?.payment_method_preview.card;

        if (!shippingAddress || !paymentSummary) throw new Error("Problem creating order");
        return { shippingAddress, paymentSummary }
    }

    const getStripeAddress = async () => {
        const addressElement = elements?.getElement('address');
        if (!addressElement) return null;

        const { value: { name, address } } = await addressElement.getValue();

        if (name && address) return { ...address, name }

        return null;
    }

    const handleNext = async () => {
        if (activestep === 0 && saveAddressChecked && elements) {
            const address = await getStripeAddress();
            if (address) await updateAddress(address);
        }

        if (activestep === 1) {
            if (!elements || !stripe) return;
            const result = await elements.submit();
            if (result.error) return toast.error(result.error.message);

            const stripeResult = await stripe.createConfirmationToken({ elements });
            if (stripeResult.error) return toast.error(stripeResult.error.message);
            setConfirmationToken(stripeResult.confirmationToken);
        }

        if (activestep === 2) {
            await confirmPayment();
        }

        if (activestep < 2) setActiveStep(step => step + 1);
    }

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    }

    const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
        setAddressComplete(event.complete);
    }

    const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
        setPaymentComplete(event.complete);
    }

    if (isLoading) return <Typography variant="h6">Loading checkout...</Typography>

    return (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Stepper activeStep={activestep}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: activestep === 0 ? 'block' : 'none' }}>
                    <AddressElement
                        options={{
                            mode: 'shipping',
                            defaultValues: {
                                name: name,
                                address: restAddress
                            }
                        }}
                        onChange={handleAddressChange}
                    />
                    <FormControlLabel
                        sx={{ display: 'flex', justifyContent: 'end' }}
                        control={
                            <Checkbox
                                checked={saveAddressChecked}
                                onChange={(e) => setSaveAddressChecked(e.target.checked)}
                            />
                        }
                        label='save as default address'
                    />
                </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: activestep === 1 ? 'block' : 'none' }}>
                    <PaymentElement onChange={handlePaymentChange}
                        options={{
                            wallets: {
                                applePay: 'never',
                                googlePay: 'never',
                            }
                        }} />
                </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: activestep === 2 ? 'block' : 'none' }}>
                    <Review confirmationToken={confirmationToken} />
                </Box>
            </Box>

            <Box display='flex' paddingTop={2} justifyContent='space-between'>
                <Button onClick={handleBack}>Back</Button>
                <LoadingButton
                    onClick={handleNext}
                    disabled={
                        (activestep === 0 && !addressComplete) ||
                        (activestep === 1 && (!paymentComplete || submitting))
                    }
                    loading={submitting}
                >
                    {activestep === steps.length - 1 ? `Pay ${currencyFormat(total)}` : 'Next'}
                </LoadingButton>
            </Box>
        </Paper>
    )
}