import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) console.error(action.payload || 'Ошибка');

  return next(action);
};
