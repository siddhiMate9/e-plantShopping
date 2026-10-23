import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((product) => product.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        quantity: 1,
      });
    },

    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.find((product) => product.id === id);

      if (!itemToUpdate) {
        return;
      }

      if (quantity <= 0) {
        return state.filter((item) => item.id !== id);
      }

      itemToUpdate.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
