import Label from '@/Components/Label';
import Navbar from '@/Components/Navbar';
import { useNotification } from '@/Components/Notification';
import Title from '@/Components/Title';
import i18n from '@/i18n';
import { CloseCircleFilled, DeleteFilled } from '@ant-design/icons';
import { Input, InputNumber, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CartInfo({ auth, order }) {
    const [t] = useTranslation();
    const [name, setName] = useState('second');
    const [address, setAddress] = useState(order.shipping_address);
    const [phone, setPhone] = useState(order.shipping_phone);
    const [note, setNote] = useState(order.note);
    const [details, setDetails] = useState({});
    const [api, pushNoti] = useNotification();
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        var tem = {};
        order.details.forEach((e) => {
            (tem = { ...tem }), (tem[e.id] = e.amount);
        });
        setDetails(tem);
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDeleteDetail = async (id) => {
        const res = await axios.delete(
            route('api.orders.deleteItem', {
                order: order.id,
                orderDetail: id
            })
        );
        location.pathname = location.pathname;
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChangeDetail = (id, { amount, price }) => {
        var tem2 = total;
        tem2 += details[id] * -price + amount * price;
        const tem = { ...details };
        tem[id] = amount;
        setDetails(tem);
        setTotal(tem2);
    };
    const handleBuy = async () => {
        setIsModalOpen(false);
        const data = {
            shipping_address: address,
            shipping_phone: phone,
            details: JSON.stringify(details),
            note: note
        };
        try {
            const res = await axios.put(
                route('api.orders.buy', {
                    order: order.id
                }),
                data,
                {
                    headers: {
                        'X-localization': i18n.language
                    }
                }
            );
            pushNoti(t('Success'), 'order thanh cong');
        } catch (e) {
            var errorsMessage = [];
            for (const [key, value] of Object.entries(e.response.data.errors)) {
                value.forEach((element) => {
                    errorsMessage.push(element);
                });
            }
            pushNoti(
                t('Error'),
                errorsMessage,
                <CloseCircleFilled className=" text-red-500" />
            );
        }
    };

    const cols = [
        {
            title: t('Name'),
            dataIndex: 'name'
        },
        {
            title: t('Price'),
            dataIndex: 'price'
        },
        {
            title: t('Amount'),
            dataIndex: 'amount'
        },
        {
            title: t('Action'),
            dataIndex: 'action'
        }
    ];
    const data = [];
    order.details.map((e) => {
        data.push({
            name: e.cake.name,
            price: new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(e.cake.price),
            amount: (
                <InputNumber
                    min={1}
                    defaultValue={e.amount}
                    onChange={(value) => {
                        handleChangeDetail(e.id, {
                            amount: value,
                            price: e.cake.price
                        });
                    }}
                />
            ),
            action: (
                <DeleteFilled
                    className=" text-red-500 text-2xl cursor-pointer"
                    onClick={() => handleDeleteDetail(e.id)}
                />
            )
        });
    });
    useEffect(() => {
        var tem = 0;
        order.details.map((e) => {
            tem += e.cake.price * e.amount;
        });
        setTotal(tem);
    }, []);
    return (
        <>
            <Navbar auth={auth} />
            <Title name={'Cart'} />
            <div className=" flex flex-col">
                <div className="flex justify-center space-x-4 w-[80%] m-auto">
                    <div className=" w-[55%]">
                        <div className="mx-auto my-2 text-center text-title">
                            <h2 className="text-capitalize font-weight-bold">
                                {t('Info')}
                            </h2>
                        </div>
                        <Label value={'Name'} />
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className=" rounded-[6px]"
                        />
                        <Label value={'Address'} />
                        <Input
                            value={address}
                            className=" rounded-[6px]"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <Label value={'Phone'} />
                        <Input
                            value={phone}
                            className=" rounded-[6px]"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Label value={'Note'} />
                        <Input.TextArea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={5}
                            autoSize={false}
                        />
                    </div>
                    <div className=" w-[45%]">
                        <div className="mx-auto my-2 text-center text-title">
                            <h2 className="text-capitalize font-weight-bold">
                                {t('Details')}
                            </h2>
                        </div>
                        <Table
                            className="mt-[30px]"
                            columns={cols}
                            dataSource={data}
                        />
                    </div>
                </div>
                <div className=" m-auto text-2xl text-red-500 font-extrabold">
                    {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    }).format(total)}
                </div>
                <button
                    style={{
                        marginTop: '3rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '400px',
                        height: 'fit-content',
                        fontSize: 'x-large',
                        color: 'white',
                        border: 'none !important',
                        paddingTop: '10px',
                        paddingBottom: '10px'
                    }}
                    className=" bg-[#b5145a] hover:opacity-50 rounded-3xl"
                    onClick={showModal}
                >
                    {t('Order')}
                </button>
            </div>
            <Modal
                title={t('Pay')}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={
                    <>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                            onClick={handleBuy}
                        >
                            {t('ok')}
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                            onClick={handleCancel}
                        >
                            {t('Cancel')}
                        </button>
                    </>
                }
            >
                <p className="m-auto text-2xl">
                    {t('TotalPay')}
                    <div className="  text-red-500 font-extrabold">
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(total)}
                    </div>
                </p>
            </Modal>
        </>
    );
}
