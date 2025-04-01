import { Alert, Button, Card, Flex, Input, Modal } from 'antd';
import './ModalShow.css';
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Product, productStore } from '../../store/ProductStore';

interface ModalShowProps {
    title: string;
    isModalOpen: boolean;
    product: Product;
    setIsModalOpen: (value: boolean) => void;
}

export const ModalShow: React.FC<ModalShowProps> = ({
    title,
    isModalOpen,
    product,
    setIsModalOpen,
}) => {
    const [description, setDescription] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (isModalOpen) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
        }
    }, [isModalOpen, product]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (name.trim() && price) {
            const updatedProduct: Product = {
                id: product.id,
                name,
                description,
                price,
            };
            productStore.updateProduct(updatedProduct);
            setIsModalOpen(false);
        } else {
            setError(true);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal}>{title}</Button>
            <Modal
                title="Редактирование товара"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Готово"
                cancelText="Отмена"
            >
                <Flex gap="middle" justify={'center'} align="center">
                    <Card
                        title={
                            <Input
                                placeholder="Новый товар"
                                value={name}
                                onChange={(e) => {
                                    setError(false);
                                    setName(e.target.value);
                                }}
                            />
                        }
                        variant="borderless"
                        style={{ width: '100%' }}
                    >
                        <div className="product-container">
                            <TextArea
                                placeholder="Описание товара..."
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                value={description}
                                onChange={(e) => {
                                    setError(false);
                                    setDescription(e.target.value);
                                }}
                                readOnly={false}
                            />
                            <Input
                                placeholder="Новая цена"
                                value={price}
                                onChange={(e) => {
                                    const digitsOnly = e.target.value.replace(
                                        /\D/g,
                                        ''
                                    );
                                    setError(false);
                                    setPrice(Number(digitsOnly));
                                }}
                                suffix="₽"
                            />
                            {error && (
                                <Alert
                                    message="Заполните все поля."
                                    type="error"
                                    showIcon
                                />
                            )}
                        </div>
                    </Card>
                </Flex>
            </Modal>
        </>
    );
};
