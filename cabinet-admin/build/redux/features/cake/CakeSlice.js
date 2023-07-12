import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cake: null,
};
const cakeSlice = createSlice({
    name: 'cakeItem',
    initialState,
    reducers: {
        setCake: (state, action) => {
            state.cake = action.payload;
        },
    },
});
export const { setCake } = cakeSlice.actions;
export default cakeSlice.reducer;
//# sourceMappingURL=CakeSlice.js.map