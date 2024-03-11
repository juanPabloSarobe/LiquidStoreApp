import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tipe: "light",
  bgPrimary: "#FBFCFD",
  bgSecondary: "#EDF2F4",
  bgWarning: "#D90429",
  bgSuccess: "#76c893",
  textPrimary: "#2B2D42",
  textSecondary: "#2B2D42",
};

export const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    setLight: (state) => {
      state.tipe = "light";
      state.bgPrimary = "#FBFCFD";
      state.bgSecondary = "#EDF2F4";
      state.bgWarning = "#D90429";
      state.bgSuccess = "#76c893";
      state.textPrimary = "#2B2D42";
      state.textSecondary = "#2B2D42";
    },
    setDark: (state) => {
      state.tipe = "dark";
      state.bgPrimary = "#0D1315";
      state.bgSecondary = "#2f3037";
      state.bgWarning = "#780000";
      state.bgSuccess = "#066839";
      state.textPrimary = "#FAFBFC";
      state.textSecondary = "#C2D3D9";
    },
  },
});

export const { setDark, setLight } = colorsSlice.actions;

export default colorsSlice.reducer;
