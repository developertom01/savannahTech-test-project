import { AnyAction, configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { RenderOptions, render as rtlRender } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ThunkMiddleware } from 'redux-thunk';
import priceHistory from '../../../store/slices/priceHistory.slice';
import { PriceHistoryState } from '../../../store/types';
window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {},
        };
    };

interface CustomRenderOption {
    preloadedState?: any;
    store?: EnhancedStore<
        {
            priceHistory: PriceHistoryState;
        },
        AnyAction,
        [
            ThunkMiddleware<
                {
                    priceHistory: PriceHistoryState;
                },
                AnyAction,
                undefined
            >,
        ]
    >;
    urlPath?: string;
    renderOptions?: RenderOptions;
}
const render = (
    ui: React.ReactElement,
    {
        preloadedState,
        store = configureStore({ reducer: { priceHistory }, preloadedState }),
        urlPath,
        ...renderOptions
    }: CustomRenderOption = {},
) => {
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const navigator = createMemoryHistory();
        navigator.push(urlPath ?? '/');
        return (
            <Provider store={store}>
                <Router location={urlPath ?? '/'} navigator={navigator}>
                    {children}
                </Router>
            </Provider>
        );
    };
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};
export * from '@testing-library/react';

export { render };
