import { createAsyncThunk } from '@reduxjs/toolkit';
import cakesApi from 'src/api/requests/cakesApi';

export const fetchShopItems = createAsyncThunk(
  'fetchShopItems',
  async (_, createAsyncThunk) => {
    try {
      return await cakesApi.loadAllCakes();
    } catch (error) {
      return createAsyncThunk.rejectWithValue('Ошибка при запросе товаров!');
    }
  },
);
