import React from 'react';
import { CircleLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className=' h-[90vh] flex justify-center items-center'>
            <CircleLoader />
        </div>
    );
};

export default LoadingSpinner;