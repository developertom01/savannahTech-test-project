import { useTypedSelector } from '.';

export const usePriceHistoryState = () => useTypedSelector((state) => state.priceHistory);
