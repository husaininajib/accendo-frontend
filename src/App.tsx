import logo from './logo.svg';
import './App.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    BrowserRouter,
    Route,
    Routes,
    RouterProvider,
    Outlet,
} from 'react-router-dom';
// import { Route, Routes } from 'react-router';
import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router';
import RootLayout from './components/RootLayout';
import CountryView from './components/CountryView';
import CountryDetails from './components/CountryDetails';
// import Countries from './pages/countries';

const CountryMainPage = lazy(() => import('./pages/CountryMainPage'));
const CountryDetailsPage = lazy(() => import('./pages/CountryDetailsPage'));

function App() {
    const [view, setView] = React.useState<'table' | 'card'>('card');

    const handleChangeView = () => {
        setView((prevView) => {
            return prevView === 'table' ? 'card' : 'table';
        });
    };

    return (
        <Suspense fallback={<span />}>
            <BrowserRouter>
                <RootLayout view={view}>
                    <Routes>
                        <Route path="/" element={<CountryMainPage />}>
                            {/* <Route index element={<CountryView view={view} handleChangeView={handleChangeView} />} /> */}
                            <Route index element={<CountryView />} />
                            <Route path=":id" element={<CountryDetailsPage />} />
                        </Route>
                    </Routes>
                </RootLayout>
            </BrowserRouter>
        </Suspense>
        // <RouterProvider router={router} />
    );
}

export default App;
