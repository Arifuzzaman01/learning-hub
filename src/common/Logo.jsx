import React from 'react';
import logo from "../assets/study-panel.png"

const Logo = React.memo(() => {
    return (
        <div className='bg-gray-50 rounded-md' >
            <img className='w-full' src={logo} alt="" />
        </div>
    );
});

export default Logo;