import { Flex } from 'antd';
import './HomePage.css';
import ProductsPage from '../ProductsPage/ProductsPage';
import BasketPage from '../BasketPage/BasketPage';
import { observer } from 'mobx-react-lite';

const HomePage: React.FC = observer(() => {
    return (
        <Flex gap="middle" align="start" className="home-page-container">
            <ProductsPage />
            <BasketPage />
        </Flex>
    );
});

export default HomePage;
