import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import { ROLE } from '@/const/role';
import i18n from '@/i18n';
import { Link } from '@inertiajs/inertia-react';
import { Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const renderAction = (role, id) => {
    const [t] = useTranslation();
    const handleDelete = async (id) => {
        const accept = confirm(t('Confirm continue'));
        if (!accept) return;
        const res = await axios.delete(
            route('api.cakes.destroy', {
                cake: id
            }),
            {
                headers: {
                    'X-localization': i18n.language
                }
            }
        );
        if (res.data.success) {
            alert(t('Success'));
            window.location.pathname = location.pathname;
        } else {
            alert(res.data.message);
        }
    };
    if (role === ROLE.ADMIN) {
        return (
            <div key={id} style={{ width: 'fit-content', display: 'flex' }}>
                <Link
                    href={route('cakes.show', {
                        cake: id
                    })}
                    as="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                >
                    <span>{t('View')}</span>
                </Link>
                <Link
                    as="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                    href={route('admin.cakes.edit', {
                        cake: id
                    })}
                >
                    <span>{t('Edit')}</span>
                </Link>
                <Link
                    as="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                    href={route('cakes.manager.addCake', {
                        cake: id
                    })}
                >
                    <span>{t('addNewCake')}</span>
                </Link>
                <button
                    onClick={() => {
                        handleDelete(id);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                >
                    <span>{t('Delete')}</span>
                </button>
            </div>
        );
    } else if (role === ROLE.EMPLOYEE) {
        return (
            <div key={id} style={{ width: 'fit-content', display: 'flex' }}>
                <Link
                    href={route('cakes.show', {
                        cake: id
                    })}
                    as="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                >
                    <span>{t('View')}</span>
                </Link>
                <Link
                    as="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                    href={route('cakes.manager.addCake', {
                        cake: id
                    })}
                >
                    <span>{t('addNewCake')}</span>
                </Link>
            </div>
        );
    }
    return <></>;
};

export default function ListCakes({ cakes, auth }) {
    const [t] = useTranslation();
    const roleId = auth.user != null ? auth.user.role_id : ROLE.USER;
    const col = [
        {
            title: t('Name'),
            dataIndex: 'name'
        },
        {
            title: t('Description'),
            dataIndex: 'description'
        },
        {
            title: t('Quantity'),
            dataIndex: 'quantity'
        },
        {
            title: t('Action'),
            dataIndex: 'action'
        }
    ];
    const dataSource = [];

    cakes.data.map((e) => {
        dataSource.push({
            name: e.name,
            description: e.description,
            action: renderAction(
                auth.user != null ? auth.user.role_id : ROLE.USER,
                e.id
            ),
            quantity: e.amount
        });
    });

    return (
        <>
            <Navbar auth={auth} />
            <Title title={t('CakeAdmin')} />
            <div
                style={{
                    padding: '0px 70px'
                }}
            >
                {roleId == ROLE.ADMIN ? (
                    <div className="d-flex justify-content-end mr-4 mb-5">
                        <Link
                            href={route('admin.cakes.create')}
                            as="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                        >
                            {t('Add')}
                        </Link>
                    </div>
                ) : (
                    <></>
                )}

                <Table columns={col} dataSource={dataSource}></Table>
            </div>
        </>
    );
}
