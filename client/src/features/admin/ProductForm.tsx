
import {  useForm, type FieldValues } from "react-hook-form"
import {  createProductSchema,type CreateProductScheme  } from "../../lib/schemas/createProdcutSchema"

import { Box,Button,Grid,Paper,  Typography } from "@mui/material"
import AppTextInput from "../../App/shared/components/AppTextInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFetchFiltersQuery } from "../catalog/catalogAPI"
import AppSelectInput from "../../App/shared/components/AppSelectInput"
import AppDropzone from "../../App/shared/components/AppDropzone"
import type { Product } from "../../App/models/product"
import { useEffect } from "react"
import { useCreateProductMutation, useUpdateProductMutation } from "./adminApi"

import { handleApiError } from "../../lib/util"

type Props ={
    setEditMode: (value: boolean) => void;
    product: Product | null;
    refetch: () => void;
    setSelectedProduct: (value: Product | null) => void;
}

export default function ProductForm({ setEditMode, product ,refetch, setSelectedProduct}: Props) {

    const{control, handleSubmit, watch, reset,setError,formState:{isSubmitting}} = useForm<CreateProductScheme>({
        mode:'onTouched',
        resolver: zodResolver(createProductSchema)

        
    })

    const watchFile = watch('file');

    const {data} = useFetchFiltersQuery();
    const[createProduct] = useCreateProductMutation();
    const[updateProduct] = useUpdateProductMutation();

        useEffect(() => {
            if(product) reset(product);
            return ()=>{
                if (watchFile) URL.revokeObjectURL(watchFile.preview)
            }
        },[product, reset, watchFile]);

        const createFormData = (items: FieldValues) =>{
            const formData = new FormData();
            for (const key in items) {
                formData.append(key, items[key] )
            }

            return formData;
        }

    const onSubmit = async (data:CreateProductScheme) => {
        try{

            const formData = createFormData(data);

            if(watchFile) formData.append('file', watchFile);

            if(product) await updateProduct({id: product.id, data: formData}).unwrap();
            else await createProduct(formData).unwrap();
            setEditMode(false);
            setSelectedProduct(null);
            
            refetch();
        }catch(error){
            console.log(error);
            handleApiError<CreateProductScheme>(error, setError, ['name', 'brand', 'type', 'price', 'quantityInStock', 'description', 'file','pictureUrl','type'])

        }
    }
  return (
    <Box component={Paper} sx={{ p: 4, maxWidth: 'lg', mx:'auto ' }}> 
    <Typography variant="h4" sx={{mb:4}}>
      Product Details
    </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
            <Grid size={12}>
                <AppTextInput control={control} name="name" label="product name"></AppTextInput>
               
                
            </Grid>
             <Grid size={6}>
                {data?.brands &&<AppSelectInput items={data.brands} control={control} name="brand" label="Brand"></AppSelectInput>}
               
                
            </Grid>
             <Grid size={6}>
                {data?.types &&<AppSelectInput items={data.types} control={control} name="type" label="Type"></AppSelectInput>}
               
                
            </Grid>
             <Grid size={12}>
                <AppTextInput control={control} type="number" name="price" label="Price in Rupees"></AppTextInput>
               
                
            </Grid>
             <Grid size={12}>
                <AppTextInput control={control} type="number" name="quantityInStock" label="Quantity in Stock"></AppTextInput>
               
                
            </Grid>
             <Grid size={12}>
                <AppTextInput control={control} multiline rows={4} name="description" label="Description"></AppTextInput>
               
                
            </Grid>
             <Grid size={12} display='flex' justifyContent='space-between' alignItems='center'>
                <AppDropzone name="file" control={control} label={""}></AppDropzone>
                {watchFile?.preview ? (
                    <img src={watchFile.preview} alt="Preview of image" style={{ maxHeight: 200}} />
                ): product?.pictureUrl ? (
                    <img src={product?.pictureUrl} alt="Preview of image" style={{ maxHeight: 200}} />
                ) : null}
                
            </Grid>

            
        </Grid>
        <Box display='flex' justifyContent='space-between' sx={{mt:3}}>
            <Button onClick={()=> setEditMode(false)} variant="contained" color='inherit'>Cancel</Button>
            <Button variant="contained" color='success' type="submit" loading={isSubmitting}>
                Submit
            </Button>
        </Box>
      
    </form>
    </Box>
    
  )
}