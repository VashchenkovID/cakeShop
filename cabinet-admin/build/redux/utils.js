import { createSelector } from 'reselect';
import { fulfilled, pending, rejected } from './constants';
export const isLoaded = (statusSelector) => (RootStateType, props) => statusSelector(RootStateType, props) === fulfilled;
export const isRejected = (statusSelector) => (RootStateType) => statusSelector(RootStateType) === rejected;
export const isPending = (statusSelector) => (RootStateType) => statusSelector(RootStateType) === pending;
export const shouldLoad = (statusSelector) => createSelector(statusSelector, (status) => status !== pending && status !== fulfilled && status !== rejected);
//# sourceMappingURL=utils.js.map