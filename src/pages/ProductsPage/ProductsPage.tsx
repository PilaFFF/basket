import './ProductsPage.css';
import { Button, Flex } from 'antd';
import { ProductItem } from '../../components/Product/ProductItem';
import { useState } from 'react';
import { ModalAdd } from '../../components/ModalAdd/ModalAdd';
import { Product, productStore } from '../../store/ProductStore';
import { observer } from 'mobx-react-lite';
import { basketStore } from '../../store/BasketStore';

const ProductsPage: React.FC = observer(() => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleDelete = (id: number) => {
        productStore.deleteProduct(id);
        basketStore.removeFromBasket(id);
    };

    const handleAddToBasket = (product: Product) => {
        basketStore.addToBasket(product);
    };

    return (
        <div className="products-page-container">
            <ModalAdd
                title="Добавить товар"
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
            {productStore.products.length > 0 && (
                <Button
                    variant="filled"
                    color="danger"
                    onClick={() => productStore.clearProducts()}
                >
                    Очистить товары
                </Button>
            )}
            <Flex
                gap="middle"
                align="center"
                style={{ display: 'flex', flexDirection: 'column-reverse' }}
            >
                {productStore.products.map((prod) => (
                    <ProductItem
                        key={prod.id}
                        id={prod.id}
                        description={prod.description}
                        name={prod.name}
                        price={prod.price}
                        isBasket={false}
                        onDelete={handleDelete}
                        onAdd={handleAddToBasket}
                    />
                ))}
            </Flex>
        </div>
    );
});

export default ProductsPage;
