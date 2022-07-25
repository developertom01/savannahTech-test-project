import React from 'react';
import Box from '../Box';
import { ContainerProps } from './Props';

const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
    return (
        <Box
            display="flex"
            justifyContent="justify-center"
            className="w-full md:px-14 lg:px-28"
            {...props}>
            {children}
        </Box>
    );
};

export default Container;
