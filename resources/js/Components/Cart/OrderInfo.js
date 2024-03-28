import { RenderStatusTag } from '@/Pages/Admin/ListOrder';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrencyVN } from '../FormatCurrency';
import { Table } from 'antd';

export default function OrderInfo({ order }) {
    const [t] = useTranslation();
    var total = 0;
    const data = [];
    const cols = [
        {
            title: t('CakeName'),
            dataIndex: 'name'
        },
        {
            title: t('Amount'),
            dataIndex: 'amount',
            width: '30%'
        }
    ];
    order.details.map((e) => {
        total += e.amount * e.cake.price;
        data.push({
            key: e.id,
            name: e.cake.name,
            amount: e.amount
        });
    });
    return (
        <div className=" mt-[20px]">
            <div className=" flex justify-between ">
                <label className=" opacity-60 text-xs text-center align-items-center mb-0 flex ">
                    {t('OrderId')}: {order.id}
                </label>
                <div>
                    <RenderStatusTag
                        type={order.status_id}
                        text={order.status.name}
                    />
                </div>
            </div>
            <div className="flex space-x-[10px] w-full">
                <div className="flex flex-col">
                    <label>
                        <b>{t('Name')}</b>: {order.user.name}
                    </label>
                    <label>
                        <b>{t('Phone')}</b>: {order.shipping_phone}
                    </label>
                    <label className=" min-w-[400px]">
                        <b>{t('Address')}</b>: {order.shipping_address}
                    </label>
                </div>
                <div className="p-1">
                    <label>
                        <b>{t('Note')}</b>:
                    </label>
                    <div>{order.note}</div>
                </div>
            </div>

            <Table
                pagination={{
                    pageSize: 5
                }}
                columns={cols}
                dataSource={data}
            />
            <div className=" text-center text-xl font-bold text-red-700">
                {t('Total')}: {formatCurrencyVN(total)}
            </div>
        </div>
    );
}
