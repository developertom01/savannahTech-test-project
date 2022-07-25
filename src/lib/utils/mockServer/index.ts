import { setupServer, SetupServerApi } from 'msw/node';
import PriceHistoryHandler from './handlers/priceHistoryHandler';
export default class MockedServer {
    private constructor() {}
    private static handlers = [PriceHistoryHandler.getPriceHistories()];
    private static _instance: SetupServerApi;

    private static _initialize() {
        if (!this._instance) {
            this._instance = setupServer(...this.handlers);
        }
    }
    public static get instance() {
        this._initialize();
        return this._instance;
    }
    public static close() {
        this._instance.close();
    }
}
