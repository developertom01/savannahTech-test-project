import LoadingState from '../lib/enums/LoadingState';
import { Price, Product } from '../lib/models/PriceHistory';

export interface PriceHistoryState {
    loading: LoadingState;
    list: Product[];
}

export interface AddProductHistoryPayload {
    name: string;
    prices?: {
        price: number;
        date: string;
    }[];
}

export interface DeletePriceEntryPayload {
    id: number;
    productId: number;
}
export interface AddPricePayload {
    productId: number;
    priceInfo: {
        price: number;
        date: string;
    };
}

export interface EditPricePayload {
    productId: number;
    priceInfo: Price;
}
export interface EditProductNamePayload {
    product: Product;
}
