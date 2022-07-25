import axios, { AxiosStatic } from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
export const mockStore = configureStore(middlewares);

export const mockedAxios = axios as jest.Mocked<AxiosStatic>;
