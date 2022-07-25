import React from 'react';
import HttpErrorBoundary from './lib/ErrorBoundaries';
import AppRoutes from './router/Routes';

const Bootstrap = () => {
    return (
        <React.Fragment>
            <HttpErrorBoundary>
                <AppRoutes />
            </HttpErrorBoundary>
        </React.Fragment>
    );
};

export default Bootstrap;
