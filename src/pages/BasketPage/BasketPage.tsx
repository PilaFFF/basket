import { Button, Flex } from 'antd';
import React from 'react';
import './BasketPage.css';
import { basketStore } from '../../store/BasketStore';
import { ProductItem } from '../../components/Product/ProductItem';
import { observer } from 'mobx-react-lite';

const BasketPage: React.FC = observer(() => {
    const totalPrice = basketStore.basket.reduce(
        (sum, product) => sum + product.price,
        0
    );

    const handleDelete = (id: number) => {
        basketStore.removeFromBasket(id);
    };

    return (
        <div className="basket-page-container">
            <div className="basket-total">{`Сумма: ${totalPrice} ₽`}</div>
            {basketStore.basket.length > 0 && (
                <Button
                    variant="filled"
                    color="danger"
                    onClick={() => basketStore.clearBasket()}
                >
                    Очистить корзину
                </Button>
            )}

            <Flex
                gap="middle"
                align="center"
                style={{ display: 'flex', flexDirection: 'column-reverse' }}
            >
                {basketStore.basket.map((prod) => (
                    <ProductItem
                        key={prod.id}
                        id={prod.id}
                        description={prod.description}
                        name={prod.name}
                        price={prod.price}
                        isBasket={true}
                        onDelete={handleDelete}
                    />
                ))}
            </Flex>
        </div>
    );
});

export default BasketPage;
