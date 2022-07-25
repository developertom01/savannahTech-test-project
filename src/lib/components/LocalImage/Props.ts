import { HTMLAttributes } from 'react';
import { THeight, TWidth } from 'tailwindcss-classnames';
import { ImageType } from '../../../res';

export interface LocalImageProps extends HTMLAttributes<HTMLImageElement> {
    src: ImageType;
    width?: TWidth;
    height?: THeight;
}
