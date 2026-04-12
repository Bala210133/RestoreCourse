import Box from "@mui/material/Box";
import { Button, FormGroup, Paper } from "@mui/material";
import Search from "./Search";
import RadioButtonGroup from "../../App/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../App/store/store";
import { resetParams, setBrands, setOrderby, setTypes } from "./catalogSlice";
import CheckboxButtons from "../../App/shared/components/CheckboxButtons";
import { useState } from "react";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to Low' },
    { value: 'priceAsc', label: 'Price - Low to High' },
]

type Props = {
    filtersData: {
        brands: string[],
        types: string[]
    }
}

export default function Filters({ filtersData: data }: Props) {
    const { orderBy, types, brands } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const [resetKey, setResetKey] = useState(0);

    function handleReset() {
        dispatch(resetParams());
        setResetKey(prev => prev + 1); 
    }

    return (
        <Box display='flex' flexDirection='column' gap={3}>
            <Paper>
                <Search />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <RadioButtonGroup
                    options={sortOptions}
                    selectedValue={orderBy}
                    onChange={e => dispatch(setOrderby(e.target.value))}
                />
            </Paper>

            <Paper sx={{ p: 3 }}>
                <CheckboxButtons
                    key={`brands-${resetKey}`}
                    items={data?.brands}
                    checked={brands}
                    onChange={(items: string[]) => dispatch(setBrands(items))}
                />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <FormGroup>
                    <CheckboxButtons
                        key={`types-${resetKey}`}
                        items={data?.types}
                        checked={types}
                        onChange={(items: string[]) => dispatch(setTypes(items))}
                    />
                </FormGroup>
            </Paper>
            <Button onClick={handleReset}>Reset Filters</Button>
        </Box>
    )
}