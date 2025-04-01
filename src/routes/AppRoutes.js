import { useRoutes } from 'react-router-dom';
import BasketPage from '../pages/BasketPage/BasketPage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import HomePage from '../pages/HomePage/HomePage';

export default function AppRoutes() {
    const routes = useRoutes([
        {
            path: '/',
            element: <HomePage />,
            index: true,
        },
        {
            path: '/products',
            element: <ProductsPage />,
            index: true,
        },
        {
            path: '/basket',
            element: <BasketPage />,
            index: true,
        },
    ]);
    return routes;
}
