import * as React from 'react';
import { Primitive } from '@radix-ui/react-primitive';

const CustomCard = React.forwardRef(({ children, ...props }, ref) => (
    <Primitive.div
        {...props}
        ref={ref}
        style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
            maxWidth: '400px',
            margin: '1rem auto',
        }}
    >
        {children}
    </Primitive.div>
));

export default CustomCard;
