import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        updateFav: (state,action) =>{
            state.items = action.payload;
        }
    }
})
export const {updateFav} = favoriteSlice.actions;
export default favoriteSlice.reducer;