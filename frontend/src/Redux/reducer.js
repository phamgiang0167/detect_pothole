import {  createSlice } from '@reduxjs/toolkit';




const usersContainer = createSlice({
    
    name:'usersBox',
    initialState:{
       
        
        orderListData:[],
        stockListData:0
    },

    reducers:{
       
        accessOrderList: (state, action) =>{
            state.orderListData = action.payload
        },
        accessTotalStock: (state, action) =>{
            state.stockListData = action.payload
        },
    },
  

});

export const {  accessOrderList, accessTotalStock } = usersContainer.actions;

export const reducer = usersContainer.reducer;