import { rest } from 'msw';
import { PriceHistory } from '../../../models/PriceHistory';
export default class PriceHistoryHandler {
    public static getPriceHistories = () => {
        return rest.get('http://www.mocky.io/v2/5c3e15e63500006e003e9795', (req, res, ctx) => {
            return res(
                ctx.json<PriceHistory>({
                    products: [
                        {
                            id: 1,
                            name: 'Product 1',
                            prices: [],
                        },
                        {
                            id: 1,
                            name: 'Product 2',
                            prices: [],
                        },
                        {
                            id: 1,
                            name: 'Product 3',
                            prices: [],
                        },
                    ],
                }),
                ctx.delay(300),
                ctx.status(200),
            );
        });
    };
}
