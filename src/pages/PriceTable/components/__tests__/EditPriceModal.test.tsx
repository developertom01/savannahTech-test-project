import moment from 'moment';
import { PriceToBeEditedInfo } from '../../../../lib/interfaces';
import { render, RenderResult } from '../../../../lib/utils/helpers/customTestRender';
import EditPriceModal from '../EditPriceModal';

describe('Edit price modal', () => {
    let page: RenderResult<
        typeof import('/home/tom/workspace/mPharma/mpharma-test-project/node_modules/@testing-library/dom/types/queries'),
        HTMLElement,
        HTMLElement
    >;
    beforeEach(() => {
        const priceInfo: PriceToBeEditedInfo = {
            productId: 1,
            price: { id: 1, date: moment.utc().toISOString(), price: 20.0 },
        };
        page = render(<EditPriceModal priceInfo={priceInfo} visible closeModal={() => {}} />);
    });
    afterEach(() => {
        page!.unmount();
    });
    it('Should have all elements on the page', () => {
        expect(page.getAllByText(/Edit price/i).length).toBeGreaterThanOrEqual(1);
        expect(page.getByTestId('date-picker')).toBeInTheDocument();
        expect(page.getByTestId('price-input')).toBeInTheDocument();
        expect(page.getByTestId('submit-btn')).toBeInTheDocument();
        expect(page.getByTestId('close-modal')).toBeInTheDocument();
    });
});
