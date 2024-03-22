import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  idToken: "",
  localId: "",
  displayName: "",
};

export const authSlice = createSlice({
  name: "auth",
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
export const { getUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
