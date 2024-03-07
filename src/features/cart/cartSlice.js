import { createSlice } from "@reduxjs/toolkit";

/* const setId = (state) => {
  state.id = new Date();
}; */

const initialState = {
  id: Date.now(),
  items: [],
  total: 0,
  quantityTotal: 0,
  fecha: new Date().toLocaleString(),
  payMethod: "",
  buyed: false,
};

const setQuantityTotal = (state) => {
  state.quantityTotal = state.items.reduce((acc, cur) => acc + cur.quantity, 0);
};
const setTotal = (state) => {
  state.total = state.items.reduce(
    (acc, cur) => Math.round((acc + cur.quantity * cur.price) * 100) / 100,
    0
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //Aca van todos los metodos que van a alterar la variable global cart

    addItemToCart: (state, actions) => {
      const itemAdded = state.items.some(
        (val) => val.id === actions.payload.id
      );
      if (!itemAdded) {
        state.items = [...state.items, { ...actions.payload }];
      } else {
        state.items = state.items.map((e) => {
          if (e.id === actions.payload.id) {
            return { ...actions.payload };
          } else {
            return e;
          }
        });
      }
      setQuantityTotal(state);
      setTotal(state);
    },

    removeItemFromCart: (state, actions) => {
      state.items = state.items.filter((e) => e.id !== actions.payload.id);
      setQuantityTotal(state);
      setTotal(state);
    },

    deleteAllitems: (state) => {
      state.items = [];
      state.payMethod = "";
      state.buyed = false;
      setQuantityTotal(state);
      setTotal(state);
      state.id = new Date().toTimeString();
    },
    buyCart: (state) => {
      state.buyed = true;
      console.log(state);
    },
  },
});

export const { addItemToCart, removeItemFromCart, deleteAllitems, buyCart } =
  cartSlice.actions;
export default cartSlice.reducer;
