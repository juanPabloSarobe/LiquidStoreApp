import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: Date.now(),
  name: "",
  email: "",
  password: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;
