import { Flex } from 'antd';
import ProductsPage from '../ProductsPage/ProductsPage';
import BasketPage from '../BasketPage/BasketPage';
import { observer } from 'mobx-react-lite';

const HomePage: React.FC = observer(() => {
    return (
        <Flex gap="middle" align="start">
            <ProductsPage />
            <BasketPage />
        </Flex>
    );
});

export default HomePage;
