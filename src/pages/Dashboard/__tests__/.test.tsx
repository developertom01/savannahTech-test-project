import MockedServer from '../../../lib/utils/mockServer';
import LandingPage from '..';
import {
    render,
    waitFor,
    getByTestId,
    fireEvent,
} from '../../../lib/utils/helpers/customTestRender';
describe('Should load state and fetch display products', () => {
    beforeAll(() => {
        MockedServer.instance.listen();
    });
    afterAll(() => {
        MockedServer.close();
    });
    afterEach(() => {
        MockedServer.instance.resetHandlers();
    });
    it('Should display all basic elements', async () => {
        const page = render(<LandingPage />);
        await waitFor(() => {
            expect(page.getByTestId('loading')).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(page.queryByText(/Loading Data/i)).toBeNull();
        });
        await waitFor(() => {
            expect(page.getAllByTestId('product-item').length).toBeGreaterThanOrEqual(1);
        });
    });
    it('Should display modal when edit price btn in pressed', async () => {
        const page = render(<LandingPage />);
        const item = await page.findAllByTestId('product-item');
        await waitFor(() => {
            expect(item.length).toBeGreaterThanOrEqual(1);
        });
        const editBtn = getByTestId(item[0], 'open-edit-product-btn');
        expect(editBtn).toBeInTheDocument();
        fireEvent.click(editBtn);
        await waitFor(() => {
            expect(page.getByTestId('edit-product-modal')).toBeInTheDocument();
            expect(page.queryByDisplayValue(/Product 1/)).not.toBeNull();
        });
    });
});
