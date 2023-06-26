export interface BasketModel {
    name: string;
    id: number | null;
    user_id: number | null;
    items: {
        id: number | null;
        localId: string;
        name: string;
        deviceId: number;
        basketId: number | null;
        count: number;
        price: number;
        countWeightType: number | null;
        weightType: string;
        decors: {
            id: number | null;
            name: string;
            items: {
                id: number | null;
                localId?: string;
                name: string;
                count: number;
                countType: string;
                pricePerUnit: number;
            }[];
        }[];
    }[];
}
