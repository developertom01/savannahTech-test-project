import React, { Component } from 'react';
import Dashboard404ErrorPage from '../../pages/Errors/Dashboard404ErrorPage';
import Box from '../components/Box';
import { HttpErrorBoundaryState } from '../interfaces';
import { CustomError } from '../utils/errors';

export class HttpErrorBoundary extends Component<any, HttpErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            errorCode: null,
            errorMessage: null,
        };
    }
    static getDerivedStateFromError(error: Error): HttpErrorBoundaryState {
        if (error instanceof CustomError) {
            return { errorCode: error.code!, errorMessage: error.message, hasError: true };
        }
        return {
            errorCode: 500,
            hasError: true,
            errorMessage: 'Error from server occurred',
        };
    }
    componentDidCatch(error: Error, errorInfo: any) {
        console.log(error.message, errorInfo);
    }

    render() {
        if (this.state.hasError && this.state.errorCode) {
            switch (this.state.errorCode) {
                case 404:
                    return <Dashboard404ErrorPage message={this.state.errorMessage!} />;

                default:
                    return <Box>500 error page</Box>;
            }
        }
        return this.props.children;
    }
}

export default HttpErrorBoundary;
