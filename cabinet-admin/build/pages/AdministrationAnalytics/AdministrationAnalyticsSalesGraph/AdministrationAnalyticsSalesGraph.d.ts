import React from 'react';
import { AnalyticsSalesItemsModel } from 'src/api/models/AnalyticsSalesModel';
interface IComponentProps {
    lineGraphData: {
        date_completed: string;
        type: string;
        id: number;
        allPrice: number;
        constPrice: number;
        name: string;
    }[];
    isLoading: boolean;
    items: AnalyticsSalesItemsModel[];
}
declare const AdministrationAnalyticsSalesGraph: React.FC<IComponentProps>;
export default AdministrationAnalyticsSalesGraph;
