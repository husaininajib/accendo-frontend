import React from 'react';
import { useParams } from 'react-router-dom';

const Country = () => {
    const { dynamicParam } = useParams();
    return <div>this is {dynamicParam} page</div>;
};

export default Country;
