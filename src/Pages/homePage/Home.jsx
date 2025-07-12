import React from 'react';
import Banner from './Banner';
import AllTutors from './AllTutors';
import AllStudySessions from '../AllStudySession';
import Service from './Service';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AllTutors />
            <AllStudySessions />
            <Service />
        </div>
    );
};

export default Home;