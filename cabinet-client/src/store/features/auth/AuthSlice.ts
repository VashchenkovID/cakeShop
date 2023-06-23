import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAllListsEmployees } from './types';
import {RequestStatusEnum} from "../../../utils/enum";

const initialState: IAllListsEmployees = {
  entities: null,
  status: RequestStatusEnum.IDLE,
  error: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setIsAuth } = authSlice.actions;
export default authSlice.reducer;
