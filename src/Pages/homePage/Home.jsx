import React from 'react';
import Banner from './Banner';
import AllTutors from './AllTutors';

import Service from './Service';
import StudySession from './StudySession';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AllTutors />
            <StudySession />
            <Service />
        </div>
    );
};

export default Home;