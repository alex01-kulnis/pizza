import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Home from './pages/Home';
//import NotFound from './pages/NotFound';
//import Cart from './pages/Cart';
//import FullPizza from './pages/FullPizza';
//import CatrForm from './pages/CartForm';
import MainLayout from './layouts/MainLayout.jsx';

import './scss/app.scss';

import Loading from './components/Loading';

const Cart = lazy(() => import(/*webpackChunkName: "Cart" */ './pages/Cart'));
const NotFound = lazy(() => import('./pages/NotFound'));
const FullPizza = lazy(() => import('./pages/FullPizza'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<Loading />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
