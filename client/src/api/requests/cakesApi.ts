import { get, post, del } from '../../api';
import { EnpointsEnum } from 'src/api/endpoints';

export default {
  loadAllCakes: (): Promise<any> => get(EnpointsEnum.GET_CAKES),
  loadOneCake: (id: string): Promise<any> =>
    get(`${EnpointsEnum.GET_ONE_CAKE}/${id}`),
  createCake: (data: any) => post(EnpointsEnum.CREATE_CAKE, data),
  removeCake: (id: string) => del(`${EnpointsEnum.REMOVE_CAKE}/${id}`),
  editCake: () => get(''),
};
