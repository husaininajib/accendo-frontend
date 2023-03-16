import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import RootLayout from './components/RootLayout';
import Loading from './components/Loading';

const CountryMainPage = lazy(() => import('./pages/CountryMainPage'));
const CountryDetailsPage = lazy(() => import('./pages/CountryDetailsPage'));
const AllCountries = lazy(() => import('./components/CountryView'));

function App() {
    return (
        <Suspense fallback={<Loading marginTop={250} />}>
            <BrowserRouter>
                <RootLayout>
                    <Routes>
                        <Route path="/" element={<CountryMainPage />}>
                            <Route index element={<AllCountries />} />
                            <Route path=":dynamicCountry" element={<CountryDetailsPage />} />
                        </Route>
                    </Routes>
                </RootLayout>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
