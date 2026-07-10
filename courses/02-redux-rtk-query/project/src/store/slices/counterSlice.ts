import {createSlice} from "@reduxjs/toolkit"

// middleware is configured in store.ts

interface CounterState{
    count:number;
}

const initialState:CounterState={
    count:0,
};

export  const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment:(state) =>{
            state.count+=1;
        },

        decrement:(state)=>{
            state.count-=1;
        },
    },

});

export default counterSlice.reducer;
export const {increment,decrement} = counterSlice.actions;