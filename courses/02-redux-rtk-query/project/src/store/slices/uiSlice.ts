import {createSlice} from "@reduxjs/toolkit"

// middleware is configured in store.ts

interface UiState{
    sidebarOpen:boolean;
}

const initialState:UiState={
    sidebarOpen:false,
}

export const uiSlice = createSlice({
    name:'ui',
    initialState,
    reducers:{
        toggleSidebar:(state)=>{
            state.sidebarOpen=!state.sidebarOpen;
        },
    },
});

export default uiSlice.reducer;
export const {toggleSidebar} = uiSlice.actions;