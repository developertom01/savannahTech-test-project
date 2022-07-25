import moment from 'moment';
import LoadingState from '../../../lib/enums/LoadingState';
import { Product } from '../../../lib/models/PriceHistory';
import { fetchPriceHistoriesThunk } from '../../thunk/priceHistory.thunk';
import { AddProductHistoryPayload } from '../../types';
import priceHistoryReducer, {
    addNewProduct,
    editProduct,
    deleteProductHistory,
    deleteProductPrice,
    editPriceItem,
} from '../priceHistory.slice';
describe('priceHistory slice reducers', () => {
    it('Should return initial state', () => {
        expect(priceHistoryReducer(undefined, { type: undefined })).toEqual({
            loading: LoadingState.IDLE,
            list: [],
        });
    });
    it('Should Add new product when added', () => {
        const newProduct: AddProductHistoryPayload = { name: 'Paracetamol', prices: [] };
        const addedProduct: Product = { id: 1, name: 'Paracetamol', prices: [] };
        expect(priceHistoryReducer(undefined, addNewProduct(newProduct))).toEqual({
            loading: LoadingState.IDLE,
            list: [addedProduct],
        });
    });
    it('Should return correct object when price is added', () => {
        const now = moment.utc().toISOString();
        const newProduct: AddProductHistoryPayload = {
            name: 'Paracetamol',
            prices: [
                { date: now, price: 12.0 },
                { date: now, price: 12.0 },
            ],
        };
        const addedProduct: Product = {
            id: 1,
            name: 'Paracetamol',
            prices: [
                { id: 1, date: now, price: 12.0 },
                { id: 2, date: now, price: 12.0 },
            ],
        };
        expect(priceHistoryReducer(undefined, addNewProduct(newProduct))).toEqual({
            loading: LoadingState.IDLE,
            list: [addedProduct],
        });
    });
    it('Should  Edit product successfully', () => {
        priceHistoryReducer(undefined, addNewProduct({ name: 'Hello', prices: [] })),
            expect(
                priceHistoryReducer(
                    { loading: LoadingState.IDLE, list: [{ id: 1, name: 'Hello', prices: [] }] },
                    editProduct({ product: { id: 1, name: 'Hello', prices: [] } }),
                ),
            ).toEqual({ loading: LoadingState.IDLE, list: [{ id: 1, name: 'Hello', prices: [] }] });
    });
    it('Should return initial state after product deletion', () => {
        expect(
            priceHistoryReducer(
                { loading: LoadingState.IDLE, list: [{ id: 1, name: 'Hello', prices: [] }] },
                deleteProductHistory(1),
            ),
        ).toEqual({
            loading: LoadingState.IDLE,
            list: [],
        });
    });
    it('Should  delete product price successfully', () => {
        const date = moment.utc().toISOString();
        expect(
            priceHistoryReducer(
                {
                    loading: LoadingState.IDLE,
                    list: [{ id: 1, name: 'Hello', prices: [{ id: 1, date, price: 12 }] }],
                },
                deleteProductPrice({ id: 1, productId: 1 }),
            ),
        ).toEqual({ loading: LoadingState.IDLE, list: [{ id: 1, name: 'Hello', prices: [] }] });
    });
    it('Should  edit product price successfully', () => {
        const date = moment.utc().toISOString();
        expect(
            priceHistoryReducer(
                {
                    loading: LoadingState.IDLE,
                    list: [{ id: 1, name: 'Hello', prices: [{ id: 1, date, price: 12 }] }],
                },
                editPriceItem({ productId: 1, priceInfo: { id: 1, date, price: 13 } }),
            ),
        ).toEqual({
            loading: LoadingState.IDLE,
            list: [{ id: 1, name: 'Hello', prices: [{ id: 1, date, price: 13 }] }],
        });
    });
});

describe('price history slice extra reducers', () => {
    it('Should return loading to be pending', () => {
        expect(
            priceHistoryReducer(undefined, { type: fetchPriceHistoriesThunk.pending.type }),
        ).toEqual({ loading: LoadingState.PENDING, list: [] });
    });
    it('Should return loading to be fulfilled', () => {
        expect(
            priceHistoryReducer(undefined, {
                type: fetchPriceHistoriesThunk.fulfilled.type,
                payload: { products: [{ id: 1, name: 'Hello', prices: [] }] },
            }),
        ).toEqual({
            loading: LoadingState.FULFILLED,
            list: [{ id: 1, name: 'Hello', prices: [] }],
        });
    });
    it('Should return loading to be rejected', () => {
        expect(
            priceHistoryReducer(undefined, { type: fetchPriceHistoriesThunk.rejected.type }),
        ).toEqual({ loading: LoadingState.REJECTED, list: [] });
    });
});
