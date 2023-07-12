import { isRejectedWithValue } from '@reduxjs/toolkit';
export const rtkQueryErrorLogger = () => (next) => (action) => {
    if (isRejectedWithValue(action))
        console.error(action.payload || 'Ошибка');
    return next(action);
};
//# sourceMappingURL=rtkQueryErrorLogger.js.map