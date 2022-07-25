import {
    fireEvent,
    render,
    RenderResult,
    waitFor,
} from '../../../../lib/utils/helpers/customTestRender';
import moment from 'moment';
import '../../../../lib/utils/helpers/customTestRender';
import AddPriceModal from '../AddPriceModal';

describe('AddPriceModal', () => {
    let AddPriceModalElement: RenderResult<
        typeof import('/home/tom/workspace/mPharma/mpharma-test-project/node_modules/@testing-library/dom/types/queries'),
        HTMLElement,
        HTMLElement
    > | null = null;

    beforeEach(() => {
        AddPriceModalElement = render(
            <AddPriceModal productId={1} visible closeModal={() => {}} />,
        );
    });
    it('Should have all elements on the page', () => {
        expect(AddPriceModalElement!.getByTestId('date-picker')).toBeInTheDocument();
        expect(AddPriceModalElement!.getByTestId('price-input')).toBeInTheDocument();
        expect(AddPriceModalElement!.getByTestId('submit-btn')).toBeInTheDocument();
    });
    it('Should display error message when submitted without input', async () => {
        const submitBtn = AddPriceModalElement!.getByTestId('submit-btn');
        fireEvent.click(submitBtn);
        await waitFor(() => {
            expect(AddPriceModalElement!.getByText(/Date is required/)).toBeInTheDocument();
            expect(AddPriceModalElement!.getByText(/Price is required/)).toBeInTheDocument();
        });
    });
    it('Should not return any error message when data is entered', async () => {
        const submitBtn = AddPriceModalElement!.getByTestId('submit-btn');
        const datePicker = AddPriceModalElement!.getByTestId('date-picker');
        const priceInput = AddPriceModalElement!.getByTestId('price-input');

        fireEvent.change(datePicker, { value: moment.utc() });
        fireEvent.change(priceInput, { value: 20.0 });

        fireEvent.click(submitBtn);
        await waitFor(() => {
            expect(AddPriceModalElement!.queryByText(/Date is required/)).toBeNull();
            expect(AddPriceModalElement!.queryByText(/Price is required/)).toBeNull();
        });
    });
});

export {};
