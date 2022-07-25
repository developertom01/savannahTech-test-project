import { createMemoryHistory } from 'history';
import moment from 'moment';
import PriceTable from '..';
import LoadingState from '../../../lib/enums/LoadingState';
import '../../../lib/utils/helpers/customTestRender';
import { render, fireEvent, waitFor } from '../../../lib/utils/helpers/customTestRender';
import { RootState } from '../../../store';

describe('Test price list page', () => {
    it('Test that initial elements are present in the dom', () => {
        const preloadedState: Pick<RootState, 'priceHistory'> = {
            priceHistory: {
                loading: LoadingState.IDLE,
                list: [
                    {
                        id: 1,
                        name: 'Hello',
                        prices: [],
                    },
                ],
            },
        };
        const page = render(<PriceTable />, {
            preloadedState,
            urlPath: '/product/1/price-history',
        });

        expect(page.getByTestId('open-add-price-modal')).toBeInTheDocument();
        expect(page.getByText(/Price history of Hello/)).toBeInTheDocument();
        expect(page.queryAllByText(/Price/i).length).toBeGreaterThanOrEqual(2);
        expect(page.getByText(/Date/)).toBeInTheDocument();
        expect(page.getByText(/Actions/)).toBeInTheDocument();
        expect(page.getByText(/No Data/)).toBeInTheDocument();
    });
    it('Should make add new price modal visible', async () => {
        const preloadedState: Pick<RootState, 'priceHistory'> = {
            priceHistory: {
                loading: LoadingState.IDLE,
                list: [
                    {
                        id: 1,
                        name: 'Hello',
                        prices: [],
                    },
                ],
            },
        };
        const page = render(<PriceTable />, {
            preloadedState,
            urlPath: '/product/1/price-history',
        });
        const addNewPriceBtn = page.getByTestId('open-add-price-modal');
        expect(addNewPriceBtn).toBeInTheDocument();
        fireEvent.click(addNewPriceBtn);
        await waitFor(() => {
            expect(page.getByTestId('add-price-modal')).toBeInTheDocument();
        });
    });
    it('Should close modal when close button is pressed', async () => {
        const preloadedState: Pick<RootState, 'priceHistory'> = {
            priceHistory: {
                loading: LoadingState.IDLE,
                list: [
                    {
                        id: 1,
                        name: 'Hello',
                        prices: [],
                    },
                ],
            },
        };
        const page = render(<PriceTable />, {
            preloadedState,
            urlPath: '/product/1/price-history',
        });
        const addNewPriceBtn = page.getByTestId('open-add-price-modal');
        expect(addNewPriceBtn).toBeInTheDocument();
        fireEvent.click(addNewPriceBtn);
        await waitFor(() => {
            expect(page.getByTestId('add-price-modal')).toBeInTheDocument();
        });
        const closeBtn = page.getByTestId('close-modal');
        fireEvent.click(closeBtn);
        await waitFor(() => {
            expect(page.queryByTestId('add-price-modal')).toBeNull();
        });
    });
    it('Should display  at least one list of prices', async () => {
        const date = moment.utc().toISOString();

        const preloadedState: Pick<RootState, 'priceHistory'> = {
            priceHistory: {
                loading: LoadingState.IDLE,
                list: [
                    {
                        id: 1,
                        name: 'Hello',
                        prices: [
                            {
                                id: 1,
                                date,
                                price: 20.0,
                            },
                        ],
                    },
                ],
            },
        };
        const page = render(<PriceTable />, {
            preloadedState,
            urlPath: '/product/1/price-history',
        });
        expect(page.getAllByTestId('price-date').length).toBeGreaterThanOrEqual(1);
        expect(page.getAllByTestId('price-value').length).toBeGreaterThanOrEqual(1);
    });
    it('Should open modal when open edit price modal is clicked', async () => {
        const preloadedState: Pick<RootState, 'priceHistory'> = {
            priceHistory: {
                loading: LoadingState.IDLE,
                list: [
                    {
                        id: 1,
                        name: 'Hello',
                        prices: [
                            {
                                id: 1,
                                date: moment().toISOString(),
                                price: 20,
                            },
                        ],
                    },
                ],
            },
        };
        const page = render(<PriceTable />, {
            preloadedState,
            urlPath: '/product/1/price-history',
        });
        const editModalBtn = page.getByTestId('open-edit-price-modal');
        expect(editModalBtn).toBeInTheDocument();
        fireEvent.click(editModalBtn);
        await waitFor(() => {
            expect(page.getByTestId('edit-price-modal')).toBeInTheDocument();
        });
    });
    it('Should open modal when close edit price modal when cancel button is clicked', async () => {
        const preloadedState: Pick<RootState, 'priceHistory'> = {
            priceHistory: {
                loading: LoadingState.IDLE,
                list: [
                    {
                        id: 1,
                        name: 'Hello',
                        prices: [
                            {
                                id: 1,
                                date: moment().toISOString(),
                                price: 20,
                            },
                        ],
                    },
                ],
            },
        };
        const page = render(<PriceTable />, {
            preloadedState,
            urlPath: '/product/1/price-history',
        });
        const editModalBtn = page.getByTestId('open-edit-price-modal');
        expect(editModalBtn).toBeInTheDocument();
        fireEvent.click(editModalBtn);
        await waitFor(() => {
            expect(page.getByTestId('edit-price-modal')).toBeInTheDocument();
        });
        const cancelBtn = page.getByTestId('close-modal');
        fireEvent.click(cancelBtn);
        await waitFor(() => {
            expect(page.queryByTestId('edit-price-modal')).toBeNull();
        });
    });
});
