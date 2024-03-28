import { formatCurrencyVN } from '@/Components/FormatCurrency';
import Title from '@/Components/Title';
import Authenticated from '@/Layouts/Authenticated';
import { STATUS } from '@/const/status';
import { Head } from '@inertiajs/inertia-react';
import { Table, Tag } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const RenderStatusTag = ({ type, text }) => {
    const tagTypes = [
        null,
        'lime',
        'green',
        'gold',
        'green',
        'red',
        'orange',
        null
    ];

    if (tagTypes[type]) {
        return (
            <Tag color={tagTypes[type]} value={type}>
                {text}
            </Tag>
        );
    }

    return (
        <Tag color="cyan" value={type}>
            {text}
        </Tag>
    );
};

const renderAction = (order) => {
    const [t] = useTranslation();
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
            {t('View')}
        </button>
    );
};

export default function ListOrder({ auth, orders }) {
    const [t] = useTranslation();
    console.log(orders);
    const data = [];
    const cols = [
        {
            title: t('CustomerName'),
            dataIndex: 'customerName'
        },
        {
            title: t('TotalAmount'),
            dataIndex: 'totalAmount'
        },
        {
            title: t('Status'),
            dataIndex: 'status',
            filters: [
                {
                    text: 'accept',
                    value: STATUS.ACCEPT
                },
                {
                    text: 'pending',
                    value: STATUS.PENDING
                },
                {
                    text: 'shipping',
                    value: STATUS.SHIPPING
                },
                {
                    text: 'done',
                    value: STATUS.DONE
                },
                {
                    text: 'fail',
                    value: STATUS.FAIL
                },
                {
                    text: 'cancel',
                    value: STATUS.CANCEL
                }
            ],
            filterMode: 'tree',
            // filterDropdown: <>test</>,
            onFilter: (value, record) => value === record.status.props.value
        },
        {
            title: t('Action'),
            dataIndex: 'action'
        }
    ];

    orders.map((e) => {
        var total = 0;
        e.details.map((detail) => {
            total += detail.amount * detail.cake.price;
        });
        data.push({
            key: e.id,
            customerName: e.user.name,
            totalAmount: formatCurrencyVN(total),
            status: <RenderStatusTag type={e.status_id} text={e.status.name} />,
            action: renderAction(e)
        });
    });

    return (
        <>
            <Authenticated auth={auth}>
                <Head title={t('ListOrders')} />
                <Title name={t('ListOrders')} />
                <Table
                    style={{
                        width: '80vw'
                    }}
                    columns={cols}
                    dataSource={data}
                />
            </Authenticated>
        </>
    );
}

export { RenderStatusTag };
