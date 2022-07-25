import { Moment } from 'moment';
import { Price } from './models/PriceHistory';
import { ErrorCodeType } from './utils/errors';
import { HTMLAttributes } from 'react';

export interface PriceToBeEditedInfo {
    productId: number;
    price: Price;
}
interface PricePayload {
    date: Moment;
    price: number;
}

export interface AddProductPayload {
    name: string;
    prices?: PricePayload[];
}
export interface AddPricePayloadInfo {
    price: number;
    date: Moment;
}
export interface EditPricePayloadInfo {
    price: number;
    date: Moment;
}

export interface HttpErrorBoundaryState {
    hasError: boolean;
    errorCode: ErrorCodeType | null;
    errorMessage: string | null;
}

export interface GenericSvgProps extends HTMLAttributes<HTMLOrSVGElement> {}
