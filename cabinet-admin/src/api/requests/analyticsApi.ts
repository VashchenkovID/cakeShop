import { AxiosResponse } from 'axios/index';
import { $authHost } from 'src/api/requests/index';
import { EnpointsEnum } from 'src/api/endpoints';
import { AnalyticsSalesModel } from 'src/api/models/AnalyticsSalesModel';
import { AnalyticsPopularsModel } from 'src/api/models/AnalyticsPopularsModel';

export default {
  getOrderProcessing: (
    date: string,
  ): Promise<AxiosResponse<{ items: Array<AnalyticsPopularsModel> }, any>> =>
    $authHost.get(`${EnpointsEnum.GET_POPULAR}/${date}`),
  getSales: (date: string): Promise<AxiosResponse<AnalyticsSalesModel, any>> =>
    $authHost.get(`${EnpointsEnum.GET_SALES}/${date}`),
};
