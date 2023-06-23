import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootStateType } from "../../store";
import { IAllListsEmployees } from "./types";

const selectSelf = (state: RootStateType) => state.authSlice;
// status
export const selectIsAuth = createDraftSafeSelector(
  selectSelf,
  (state: IAllListsEmployees) => state.isAuth
);
