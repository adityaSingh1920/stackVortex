import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    addItems: (state) => {
      state.totalItems += 1;
      toast("item added to cart");
      localStorage.setItem("totalItems", JSON.stringify((state.totalItems)));
    },
    removeItems: (state) => {
     if(state.totalItems > 0 ) {
        state.totalItems -=1;
        toast("items deleted from cart");
        localStorage.setItem("totalItems",JSON.stringify((state.totalItems)))
     } else {
        toast("cart is empty")
     }
        
    },
   resetCart: (state) => {
    state.totalItems = 0;
    localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
}

  },
});

export const { setTotalItems, addItems, removeItems, resetCart  } = cartSlice.actions;
export default cartSlice.reducer;
