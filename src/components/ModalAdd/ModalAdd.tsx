import { Alert, Button, Card, Flex, Input, Modal } from 'antd';
import './ModalAdd.css';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Product, productStore } from '../../store/ProductStore';

interface ModalAddProps {
    title: string;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}

const generateId = () => {
    return Math.floor(10000000 + Math.random() * 90000000);
};

export const ModalAdd: React.FC<ModalAddProps> = ({
    title,
    isModalOpen,
    setIsModalOpen,
}) => {
    const [description, setDescription] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (name.trim() && price) {
            const id = generateId();
            const newProduct: Product = { id, name, description, price };
            productStore.addProduct(newProduct);
            setName('');
            setDescription('');
            setPrice(0);
            setIsModalOpen(false);
        } else {
            setError(true);
        }
    };

    const handleCancel = () => {
        setName('');
        setDescription('');
        setPrice(0);
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {title}
            </Button>
            <Modal
                title="Добавление товара"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Добавить"
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
