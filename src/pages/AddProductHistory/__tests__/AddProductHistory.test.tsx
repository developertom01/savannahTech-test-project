import {
    RenderResult,
    fireEvent,
    waitFor,
    getByTestId as rctGetByTestId,
    render,
} from '@testing-library/react';
import moment from 'moment';
import AddProductHistory from '..';
import '../../../lib/utils/helpers/customTestRender';
jest.mock('../../../store');
jest.mock('react-router-dom');
describe('Test Add ProductHistory component', () => {
    let addProductElement: RenderResult<
        typeof import('/home/tom/workspace/mPharma/mpharma-test-project/node_modules/@testing-library/dom/types/queries'),
        HTMLElement,
        HTMLElement
    > | null = null;
    beforeEach(() => {
        addProductElement = render(<AddProductHistory />);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should detect all components', () => {
        const { getByTestId } = addProductElement!;
        expect(getByTestId('page_header').textContent).toBe('Add new Product');
        expect(getByTestId('form-product-name-input')).toBeInstanceOf(HTMLInputElement);
        expect(getByTestId('add-price-input-group')).toBeInTheDocument();
        expect(getByTestId('submit-add-product-btn').textContent).toBe('Add Product');
        expect(getByTestId('submit-add-product-btn')).toBeInstanceOf(HTMLButtonElement);
    });
    it('Should detect the existence of error message when form is submitted', async () => {
        const { getByTestId } = addProductElement!;
        const submitBtn = getByTestId('submit-add-product-btn') as HTMLButtonElement;

        fireEvent.click(submitBtn);
        await waitFor(() => {
            expect(addProductElement?.getByText(/Product Name is required/)).toBeInTheDocument();
        });
    });
    it('Should add price item form group when add price group button is pressed', async () => {
        const { getByTestId } = addProductElement!;
        const addFormGroupBtn = getByTestId('add-price-input-group') as HTMLButtonElement;

        fireEvent.click(addFormGroupBtn);
        await waitFor(() => {
            expect(addProductElement?.getByTestId('prices-form-group')).toBeInTheDocument();
        });
    });
    it('Should submit form when no price is added', async () => {
        const { getByTestId } = addProductElement!;
        const inputElement = getByTestId('form-product-name-input');
        const submitBtn = getByTestId('submit-add-product-btn') as HTMLButtonElement;

        fireEvent.change(inputElement, { target: { value: 'Paracetamol' } });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(addProductElement?.queryByText(/Product Name is required/)).toBeNull();
        });
    });
    it('Should submit form when prices are added', async () => {
        const { getByTestId } = addProductElement!;
        const inputElement = getByTestId('form-product-name-input');
        const submitBtn = getByTestId('submit-add-product-btn') as HTMLButtonElement;
        const addPriceFormGroup = getByTestId('add-price-input-group') as HTMLButtonElement;
        fireEvent.click(addPriceFormGroup);
        const priceItemElements = await addProductElement?.findAllByTestId('prices-form-group');
        await waitFor(() => {
            expect(priceItemElements?.length).toBe(1);
        });
        for (const elementGroup of priceItemElements!) {
            const pricePicker = rctGetByTestId(elementGroup, 'price-date-picker');
            const priceInput = rctGetByTestId(elementGroup, 'price-price-input');
            fireEvent.change(inputElement, { target: { value: 'Paracetamol' } });

            fireEvent.change(pricePicker, { value: moment.utc() });
            fireEvent.change(priceInput, { value: 20.0 });
            fireEvent.click(submitBtn);
        }
        await waitFor(() => {
            expect(addProductElement?.queryByText(/Product Name is required/)).toBeNull();
            expect(addProductElement?.queryByText(/Date is required/)).toBeNull();
            expect(addProductElement?.queryByText(/Price is required/)).toBeNull();
        });
    });
    it('Should submit form when multiple prices are added', async () => {
        const { getByTestId } = addProductElement!;
        const inputElement = getByTestId('form-product-name-input');
        const submitBtn = getByTestId('submit-add-product-btn') as HTMLButtonElement;
        const addPriceFormGroup = getByTestId('add-price-input-group') as HTMLButtonElement;
        fireEvent.click(addPriceFormGroup);
        fireEvent.click(addPriceFormGroup);
        fireEvent.click(addPriceFormGroup);
        const priceItemElements = await addProductElement?.findAllByTestId('prices-form-group');
        fireEvent.click(addPriceFormGroup);

        await waitFor(() => {
            expect(priceItemElements?.length).toBe(3);
        });
        for (const elementGroup of priceItemElements!) {
            const pricePicker = rctGetByTestId(elementGroup, 'price-date-picker');
            const priceInput = rctGetByTestId(elementGroup, 'price-price-input');
            fireEvent.change(inputElement, { target: { value: 'Paracetamol' } });

            fireEvent.change(pricePicker, { value: moment.utc() });
            fireEvent.change(priceInput, { value: 20.0 });
            fireEvent.click(submitBtn);
        }
        await waitFor(() => {
            expect(addProductElement?.queryByText(/Product Name is required/)).toBeNull();
            expect(addProductElement?.queryByText(/Date is required/)).toBeNull();
            expect(addProductElement?.queryByText(/Price is required/)).toBeNull();
        });
    });
});
