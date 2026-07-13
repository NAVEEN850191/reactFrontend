import {useAppSelector,useAppDispatch} from "../store/hooks"
import { increment, decrement } from "../store/slices/counterSlice";

export default function CounterView() {
  const counter= useAppSelector((state)=>state.counter);
  const dispatch=useAppDispatch();
  return (
    <div id="counter-view">
      <h2 data-testid="counter-value">{counter.count}</h2>

       <button
        data-testid="increment-btn"
        onClick={() => dispatch(increment())}
      >Increment</button>

      <button
        data-testid="decrement-btn"
        onClick={() => dispatch(decrement())}
      >Decrement</button>
    </div>
  )
}
