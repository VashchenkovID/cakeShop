import { LocalStorageKeysEnum } from './enum';

export const storageToken = () => {
  return localStorage.getItem(LocalStorageKeysEnum.TOKEN);
};

export const storageUser = () => {
  const user = localStorage.getItem(LocalStorageKeysEnum.USER)
  if (user) {
    return JSON.parse(user)
  } else return null
}
