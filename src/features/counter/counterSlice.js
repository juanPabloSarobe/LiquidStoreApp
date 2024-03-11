import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  idToken: "",
  localId: "",
  displayName: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
      state.localId = action.payload.localId;
      state.displayName = action.payload.displayName;
    },
    clearUser: (state) => {
      state.email = "";
      state.idToken = "";
      state.localId = "";
      state.displayName = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUser, clearUser } = counterSlice.actions;

export default counterSlice.reducer;
