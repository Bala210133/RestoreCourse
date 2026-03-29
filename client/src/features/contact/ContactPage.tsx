
import Typography from "@mui/material/Typography";
import { increment, decrement } from "./counterReducer";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "../../App/store/store";


export default function ContactPage() {
  const data = useAppSelector((state) => state.counter.data);
  const dispatch = useAppDispatch(); 

  return (
    <div>
      <Typography variant="h2">Contact Page</Typography>

      <Typography variant="body1">
        The data is: {data}
      </Typography>

      <ButtonGroup>
        <Button onClick={() => dispatch(increment(1))} color="success">
          Increment
        </Button>

        <Button onClick={() => dispatch(decrement(1))} color="error">
          Decrement
        </Button>
        <Button onClick={() => dispatch(increment(5))} color="primary">
          Increment by 5
        </Button>
      </ButtonGroup>
    </div>
  );
}