import { createDraftSafeSelector } from '@reduxjs/toolkit';
const selectSelf = (state) => state.userSlice;
// status
export const selectIsAuth = createDraftSafeSelector(selectSelf, (state) => state.isAuth);
//# sourceMappingURL=selectors.js.map