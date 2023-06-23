import { createDraftSafeSelector } from "@reduxjs/toolkit";
const selectSelf = (state) => state.authSlice;
// status
export const selectIsAuth = createDraftSafeSelector(selectSelf, (state) => state.isAuth);
//# sourceMappingURL=selectors.js.map