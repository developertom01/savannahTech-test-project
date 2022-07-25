import React from 'react';
import R from '../../../res';
import { SvgProps } from './Props';
import { classnames, height as twHeight, width as twWidth } from 'tailwindcss-classnames';

const Svg: React.FC<SvgProps> = ({ src, width, height, className }) => {
    const Element = R.svgs[src];
    return (
        <React.Fragment>
            <Element className={`${className} ${classnames(twHeight(height), twWidth(width))}`} />
        </React.Fragment>
    );
};

export default Svg;
