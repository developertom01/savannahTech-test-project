import { Product } from '../../../../lib/models/PriceHistory';
import {
    render,
    RenderResult,
    fireEvent,
    waitFor,
} from '../../../../lib/utils/helpers/customTestRender';
import EditProductModal from '../EditProductModal';

describe('Test EditProductModal', () => {
    const product: Product = { id: 1, name: 'Product 1', prices: [] };
    let page: RenderResult<
        typeof import('/home/tom/workspace/mPharma/mpharma-test-project/node_modules/@testing-library/dom/types/queries'),
        HTMLElement,
        HTMLElement
    >;
    beforeEach(() => {
        page = render(<EditProductModal visible closeModal={() => {}} product={product} />);
    });
    afterEach(() => {
        page.unmount();
    });
    it('Should display various', () => {
        expect(page.queryAllByText(/Edit Product Name/i).length).toBeGreaterThanOrEqual(1);
        expect(page.getByTestId('submit-btn')).toBeInTheDocument();
        expect(page.getByTestId('name-input')).toBeInTheDocument();
    });
    it('Input element should display text of product name', () => {
        expect(page.queryByDisplayValue(/Product 1/i)).not.toBeNull();
    });
    it('Input element should display new input element when changed', () => {
        const inputElement = page.getByTestId('name-input');
        expect(inputElement).toBeInTheDocument();
        fireEvent.change(inputElement, {
            value: {
                target: {
                    value: 'New product name',
                },
            },
        });
        waitFor(() => {
            expect(page.queryByDisplayValue(/New product name/i)).not.toBeNull();
        });
    });
    it('Should not display error message when not input is present', async () => {
        const inputElement = page.getByTestId('name-input');
        const submitBTN = page.getByTestId('submit-btn');
        expect(inputElement).toBeInTheDocument();
        fireEvent.change(inputElement, {
            value: {
                target: {
                    value: 'Hello',
                },
            },
        });
        fireEvent.click(submitBTN);
        await waitFor(() => {
            expect(page.queryByText(/Product name is required/i)).toBeNull();
        });
    });
});
