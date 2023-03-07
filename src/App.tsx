import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Route, Routes } from 'react-router';
import React, { lazy } from 'react';
import { useParams } from 'react-router';
// import Countries from './pages/countries';

const Home = lazy(() => import('./pages/home'));
const Country = lazy(() => import('./components/country'));

function App() {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="countries" element={<Home />}>
                    {/* <Route path="/countries" element={<div>hahaha</div>}> */}
                    {/* <div className="App"></div> */}
                    {/* <Route path="j" element={<div>this is hello</div>} /> */}
                </Route>
                <Route path="/countries/:dynamicParam" element={<Country />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
