// components/CustomButton.js
import * as React from 'react';
import { Primitive } from '@radix-ui/react-primitive';

const CustomButton = React.forwardRef(({ children, ...props }, ref) => (
    <Primitive.button
        {...props}
        ref={ref}
        style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#1D4ED8',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
        }}
    >
        {children}
    </Primitive.button>
));

export default CustomButton;
