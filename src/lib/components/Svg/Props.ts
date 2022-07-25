import { THeight, TWidth } from 'tailwindcss-classnames';
import { SVGTypes } from '../../../res';
import { GenericSvgProps } from '../../interfaces';

export interface SvgProps extends GenericSvgProps {
    src: SVGTypes;
    width?: TWidth;
    height?: THeight;
}
