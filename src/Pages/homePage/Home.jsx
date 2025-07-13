import React from 'react';
import Banner from './Banner';
import AllTutors from './AllTutors';

import Service from './Service';
import StudySession from './StudySession';
import HomeFeatureSection from './HomeFeatureSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AllTutors />
            <StudySession />
            <Service />
            <HomeFeatureSection />
        </div>
    );
};

export default Home;