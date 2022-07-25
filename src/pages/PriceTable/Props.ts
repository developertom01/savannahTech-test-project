import { DrawerProps } from 'antd';
import { PriceToBeEditedInfo } from '../../lib/interfaces';
export interface AddPriceModalProps extends DrawerProps {
    productId: number;
    closeModal: () => void;
}
export interface EditPriceModalProps extends DrawerProps {
    priceInfo: PriceToBeEditedInfo;
    closeModal: () => void;
}
