import React from 'react';
import { useParams } from 'react-router-dom';
import { RootObject } from '../../helper/types';

const Country = () => {
    const { dynamicParam } = useParams();
    // const { countries } = props;
    // const isCountryExist = !!countries.find(
    //     (country) => country.name.official.toLowerCase() === dynamicParam?.toLowerCase()
    // );
    // return <div>{isCountryExist ? `this is ${dynamicParam} country` : 'Country do not exist'}</div>;
    return <div>this is {dynamicParam}</div>;
};

export default Country;
