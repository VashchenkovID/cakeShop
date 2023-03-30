import { LocalStorageKeysEnum, RequestStatusEnum } from 'src/utils/enum';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAuthUser } from 'src/redux/features/auth/actions';
import { IAuthUserData } from 'src/redux/features/auth/types';
import { fetchShopItems } from 'src/redux/features/shop/actions';

const initialState: any = {
  items: null,
  status: RequestStatusEnum.IDLE,
  error: null,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchShopItems.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.items = action.payload;
        state.status = RequestStatusEnum.FULFILLED;
        state.error = null;
      },
    );
    builder.addCase(fetchShopItems.pending, (state) => {
      state.status = RequestStatusEnum.PENDING;
      state.error = null;
    });
    builder.addCase(fetchShopItems.rejected, (state, action) => {
      state.status = RequestStatusEnum.REJECTED;
      state.error = action.error.message ?? 'Ошибка';
    });
  },
});

export default shopSlice.reducer;
