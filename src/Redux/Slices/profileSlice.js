import { createSlice } from '@reduxjs/toolkit'

const initialState = {
user: (() => {
  const data = localStorage.getItem("user");
  if (!data || data === "undefined") return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
})(),
 
  loading :false
};

const profileSlice = createSlice(
  {
    name:"user",
    initialState,
    reducers:
    {
      setUser:(state,value)=>{
        state.user = value.payload

      },
        handleLoading:(state, value) =>
      {
        state.loading = value.payload
      }
    }
  }
)


export const {setUser} = profileSlice.actions;
export default profileSlice.reducer