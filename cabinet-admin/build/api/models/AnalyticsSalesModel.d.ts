export interface AnalyticsSalesModel {
    earned: number;
    items: AnalyticsSalesItemsModel[];
    message: string;
    profit: number;
    spent: number;
}
export interface AnalyticsSalesItemsModel {
    id: number;
    allPrice: number;
    constPrice: number;
    name: string;
    date_completed: string;
    type: string;
}
