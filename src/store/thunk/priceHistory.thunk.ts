import { createAsyncThunk } from '@reduxjs/toolkit';
import { PriceHistory } from '../../lib/models/PriceHistory';
import RequestManager from '../../lib/utils/requestManager';

export const fetchPriceHistoriesThunk = createAsyncThunk(
    'price-history-fetch',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await RequestManager.get<PriceHistory[]>(
                'http://www.mocky.io/v2/5c3e15e63500006e003e9795',
            );

            return fulfillWithValue(response);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
