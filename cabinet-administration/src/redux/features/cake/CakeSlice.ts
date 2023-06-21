import { DeviceItemModel } from 'src/api/models/DeviceItemModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICakeSliceStateType {
  cake: DeviceItemModel | null;
}

const initialState: ICakeSliceStateType = {
  cake: null,
};

const cakeSlice = createSlice({
  name: 'cakeItem',
  initialState,
  reducers: {
    setCake: (state, action: PayloadAction<DeviceItemModel | null>) => {
      state.cake = action.payload;
    },
  },
});
export const { setCake } = cakeSlice.actions;
export default cakeSlice.reducer;
