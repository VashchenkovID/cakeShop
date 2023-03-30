import { IAuthUser, IAuthUserData } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from 'src/api/requests/userAPI';

export const fetchAuthUser = createAsyncThunk(
  'auth/fetchAuthUser',
  async (auth: IAuthUser, createAsyncThunk) => {
    try {
      const payload = await userAPI.loadAuthUser(auth);
      return payload as IAuthUserData;
    } catch (error) {
      return createAsyncThunk.rejectWithValue('Ошибка при авторизации!');
    }
  },
);
