import LoadingState from '../../../../lib/enums/LoadingState';
import { Product } from '../../../../lib/models/PriceHistory';
import {
    render,
    waitFor,
    getByTestId,
    fireEvent,
} from '../../../../lib/utils/helpers/customTestRender';
import { RootState } from '../../../../store';
import ProductList from '../ProductList';

describe('Test PriceHistoryList', () => {
    it('Should display loading state', () => {
        const products: Product[] = [];
        const preloadedState: Pick<RootState, 'priceHistory'> = {
            priceHistory: { loading: LoadingState.PENDING, list: products },
        };
        const page = render(<ProductList />, { preloadedState });
        expect(page.getAllByTestId('loading').length).toBeGreaterThan(1);
    });
    it('Should display empty data', () => {
        const products: Product[] = [];
        const preloadedState: Pick<RootState, 'priceHistory'> = {
            priceHistory: { loading: LoadingState.FULFILLED, list: products },
        };
        const page = render(<ProductList />, { preloadedState });
        expect(page.queryByText(/no data/i)).not.toBeNull();
    });
    it('Should display list of data', async () => {
        const products: Product[] = [
            {
                id: 1,
                name: 'Product 1',
                prices: [],
            },
            {
                id: 2,
                name: 'Product 2',
                prices: [],
            },
            {
                id: 3,
                name: 'Product 3',
                prices: [],
            },
        ];
        const preloadedState: Pick<RootState, 'priceHistory'> = {
            priceHistory: { loading: LoadingState.FULFILLED, list: products },
        };
        const page = render(<ProductList />, { preloadedState });
        const allElements = page.getAllByTestId('product-item');
        expect(allElements.length).toBe(3);
        await waitFor(() => {
            for (const element of allElements) {
                expect(getByTestId(element, 'open-edit-product-btn')).toBeInTheDocument();
                expect(getByTestId(element, 'delete-product-btn')).toBeInTheDocument();
            }
        });
    });
    it('Should open edit product modal', async () => {
        const products: Product[] = [
            {
                id: 1,
                name: 'Product 1',
                prices: [],
            },
        ];
        const preloadedState: Pick<RootState, 'priceHistory'> = {
            priceHistory: { loading: LoadingState.FULFILLED, list: products },
        };
        const page = render(<ProductList />, { preloadedState });
        const allElements = page.getAllByTestId('product-item');
        expect(allElements.length).toBe(1);
        fireEvent.click(getByTestId(allElements[0], 'open-edit-product-btn'));
        await waitFor(() => {
            expect(page.getByTestId('edit-product-modal')).toBeInTheDocument();
        });
    });
});
