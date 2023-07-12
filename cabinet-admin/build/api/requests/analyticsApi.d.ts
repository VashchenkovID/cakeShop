import { AxiosResponse } from 'axios/index';
import { AnalyticsSalesModel } from 'src/api/models/AnalyticsSalesModel';
import { AnalyticsPopularsModel } from 'src/api/models/AnalyticsPopularsModel';
declare const _default: {
    getOrderProcessing: (date: string) => Promise<AxiosResponse<{
        items: Array<AnalyticsPopularsModel>;
    }, any>>;
    getSales: (date: string) => Promise<AxiosResponse<AnalyticsSalesModel, any>>;
};
export default _default;
