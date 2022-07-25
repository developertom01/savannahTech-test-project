import { DrawerProps } from 'antd';
import { Product } from '../../../lib/models/PriceHistory';

export interface EditProductModalProps extends DrawerProps {
    closeModal: () => void;
    product: Product;
}
