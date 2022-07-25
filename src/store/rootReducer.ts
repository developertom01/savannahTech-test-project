import { combineReducers } from '@reduxjs/toolkit';
import priceHistory from './slices/priceHistory.slice';

const rootReducer = combineReducers({
    priceHistory,
});

export default rootReducer;
