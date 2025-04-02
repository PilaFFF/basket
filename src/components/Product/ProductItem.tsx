import { Button, Card, Flex } from 'antd';
import './Product.css';
import Trash from '../../assets/Trash';
import { Product } from '../../store/ProductStore';
import { ModalShow } from '../ModalShow/ModalShow';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { basketStore } from '../../store/BasketStore';

interface ProductProps {
    id: number;
    name: string;
    description: string;
    price: number;
    isBasket: boolean;
    onDelete: (id: number) => void;
    onAdd?: (product: Product) => void;
}

export const ProductItem: React.FC<ProductProps> = observer(
    ({ id, name, description, price, isBasket, onDelete, onAdd }) => {
        const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

        const isInBasket = basketStore.basket.some((item) => item.id === id);

        return (
            <Card title={name} variant="borderless" className="product-card">
                <div className="product-container">
                    <div className="product-description">
                        {description || 'Нет описания'}
                    </div>
                    <Flex
                        gap="middle"
                        justify={isBasket ? 'flex-end' : 'space-between'}
                        align="center"
                        style={{ width: '100%' }}
                    >
                        {!isBasket && onAdd && (
                            <Button
                                style={{ width: '50%' }}
                                type="primary"
                                onClick={() =>
                                    onAdd({ id, name, description, price })
                                }
                                disabled={isInBasket}
                            >
                                {isInBasket ? 'Уже в корзине' : 'В корзину'}
                            </Button>
                        )}

                        <Button
                            icon={<Trash />}
                            variant="filled"
                            color="danger"
                            onClick={() => onDelete(id)}
                        />
                        <div className="product-price">{`${price} ₽`}</div>
                    </Flex>
                </div>
                {!isBasket && (
                    <ModalShow
                        title="Редактировать товар"
                        isModalOpen={isModalOpen}
                        product={{ id, name, description, price }}
                        setIsModalOpen={setIsModalOpen}
                    />
                )}
            </Card>
        );
    }
);
