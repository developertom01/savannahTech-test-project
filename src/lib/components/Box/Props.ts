import React, { HTMLAttributes } from 'react';
import { TAlignItems, TDisplay, TJustifyContent } from 'tailwindcss-classnames';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    display?: TDisplay;
    justifyContent?: TJustifyContent;
    alignItems?: TAlignItems;
    children?: React.ReactNode;
}
