import React from 'react';
import { CircleLoader } from "react-spinners";

const LoadingSpinner = React.memo(() => {
    return (
        <div className=' h-[90vh] flex justify-center items-center'>
            <CircleLoader />
        </div>
    );
});

export default LoadingSpinner;