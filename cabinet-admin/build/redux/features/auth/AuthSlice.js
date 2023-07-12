import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    entities: null,
    status: "idle" /* RequestStatusEnum.IDLE */,
    error: null,
    isAuth: false,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    },
});
export const { setIsAuth } = authSlice.actions;
export default authSlice.reducer;
//# sourceMappingURL=AuthSlice.js.map