import { createSelector } from 'reselect';
import { fulfilled, pending, rejected } from './constants';

export const isLoaded =
  (statusSelector: any) => (RootStateType: any, props: any) =>
    statusSelector(RootStateType, props) === fulfilled;

export const isRejected = (statusSelector: any) => (RootStateType: any) =>
  statusSelector(RootStateType) === rejected;

export const isPending = (statusSelector: any) => (RootStateType: any) =>
  statusSelector(RootStateType) === pending;

export const shouldLoad = (statusSelector: any) =>
  createSelector(
    statusSelector,
    (status: string) =>
      status !== pending && status !== fulfilled && status !== rejected,
  );
