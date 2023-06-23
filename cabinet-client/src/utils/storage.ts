import { LocalStorageKeysEnum } from './enum';

export const storageToken = () => {
  return localStorage.getItem(LocalStorageKeysEnum.TOKEN);
};

export const storageId = () => {
  return localStorage.getItem(LocalStorageKeysEnum.ID);
};
