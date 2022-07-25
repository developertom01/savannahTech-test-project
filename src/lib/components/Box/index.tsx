import React from 'react';
import { BoxProps } from './Props';
import classnames, {
    display as displayFn,
    alignItems as alignItemsFn,
    justifyContent as justifyContentFn,
} from 'tailwindcss-classnames';

const Box: React.FC<BoxProps> = ({
    alignItems,
    display,
    className,
    justifyContent,
    children,
    ...props
}) => {
    return (
        <div
            className={`${className} ${classnames(
                alignItemsFn(alignItems),
                displayFn(display),
                justifyContentFn(justifyContent),
            )}`}
            {...props}>
            {children}
        </div>
    );
};

export default Box;
