import { createSlice, PayloadAction as PA } from '@reduxjs/toolkit';
import LoadingState from '../../lib/enums/LoadingState';
import { PriceHistory, Product } from '../../lib/models/PriceHistory';
import { fetchPriceHistoriesThunk } from '../thunk/priceHistory.thunk';
import {
    AddPricePayload,
    AddProductHistoryPayload,
    DeletePriceEntryPayload,
    EditPricePayload,
    EditProductNamePayload,
    PriceHistoryState,
} from '../types';

const initialState: PriceHistoryState = {
    loading: LoadingState.IDLE,
    list: [],
};

const slice = createSlice({
    name: 'price-history',
    initialState,
    reducers: {
        editProduct: (state, { payload }: PA<EditProductNamePayload>) => {
            const productIndex = state.list.findIndex((item) => item.id === payload.product.id);
            state.list.splice(productIndex, 1, payload.product);
        },
        editPriceItem: (state, { payload }: PA<EditPricePayload>) => {
            const productIndex = state.list.findIndex((item) => item.id === payload.productId);
            const priceIndex = state.list[productIndex].prices.findIndex(
                (item) => item.id === payload.priceInfo.id,
            );
            state.list[productIndex].prices.splice(priceIndex, 1, payload.priceInfo);
        },
        addPriceItem: (state, { payload }: PA<AddPricePayload>) => {
            const productId = state.list.findIndex((item) => item.id === payload.productId);
            /* Getting the last price id from the list of prices. */
            const lastPriceId =
                state.list[productId]?.prices?.length === 0
                    ? 0
                    : Math.max(
                          ...state.list
                              .map((item) => item.prices)
                              .flat()
                              .map((price) => price.id),
                      );
            state.list[productId].prices.push({ ...payload.priceInfo, id: lastPriceId + 1 });
        },
        /* Adding a new product to the list of products. */
        addNewProduct: (state, { payload }: PA<AddProductHistoryPayload>) => {
            /* Getting the last product id from the list of products. */
            const lastProductId =
                state.list.length === 0 ? 0 : Math.max(...state.list.map((product) => product.id));
            /* Getting the last price id from the list of prices. */
            const lastPriceId =
                state.list.length === 0
                    ? 0
                    : Math.max(
                          ...state.list
                              .map((item) => item.prices)
                              .flat()
                              .map((price) => price.id),
                      );
            const product: Product = {
                ...payload,
                id: lastProductId + 1,
                prices: payload.prices
                    ? [
                          ...payload.prices.map((price, index) => ({
                              ...price,
                              id: lastPriceId + index + 1,
                          })),
                      ]
                    : [],
            };
            state.list.push(product);
        },
        deleteProductHistory: (state, { payload }: PA<number>) => {
            state.list = state.list.filter((product) => product.id != payload);
        },
        deleteProductPrice: (state, { payload }: PA<DeletePriceEntryPayload>) => {
            const productId = state.list.findIndex((item) => item.id === payload.productId);
            const priceId = state.list[productId]?.prices?.findIndex(
                (item) => item.id === payload.id,
            );
            state.list[productId]?.prices.splice(priceId, 1);
        },
    },
    extraReducers: {
        [fetchPriceHistoriesThunk.pending.type]: (state) => {
            state.loading = LoadingState.PENDING;
        },
        [fetchPriceHistoriesThunk.fulfilled.type]: (state, { payload }: PA<PriceHistory>) => {
            state.loading = LoadingState.FULFILLED;
            /**
             *  Checking if the product is already in the list. If it is not, it adds it.
             *  Doing this to prevent new product from vanishing whenever useEffect is called
             *  */
            const storedIDs = state.list.map((item) => item.id);
            for (const product of payload?.products ?? []) {
                if (!storedIDs.includes(product.id)) {
                    state.list.push(product);
                }
            }
        },
        [fetchPriceHistoriesThunk.rejected.type]: (state) => {
            state.loading = LoadingState.REJECTED;
        },
    },
});

export const {
    addNewProduct,
    deleteProductHistory,
    editPriceItem,
    addPriceItem,
    deleteProductPrice,
    editProduct,
} = slice.actions;

export default slice.reducer;
