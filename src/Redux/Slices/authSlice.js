import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 token: (() => {
  const data = localStorage.getItem("token");
  if (!data || data === "undefined") return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
})(),

  loading :false
};

const authSlice = createSlice(
  {
    name:"auth",
    initialState,
    reducers:
    {
      setTokens:(state,value)=>{
        state.token = value.payload

      },
      handleLoading:(state, value) =>
      {
        state.loading = value.payload
      }
    }
  }
)


export const {setTokens,logout,handleLoading} = authSlice.actions;
export default authSlice.reducer