import React from 'react';
import R from '../../../res';
import { LocalImageProps } from './Props';
import classnames, { height as HeightFn, width as WidthFn } from 'tailwindcss-classnames';
const LocalImage: React.FC<LocalImageProps> = ({ src, className, width, height, ...props }) => {
    return (
        <img
            className={`${className} ${classnames(HeightFn(height), WidthFn(width))}`}
            src={R.images[src]}
            alt={src}
            {...props}
        />
    );
};

export default LocalImage;
