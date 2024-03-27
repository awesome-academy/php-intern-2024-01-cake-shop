import Navbar from '@/Components/Navbar';
import Title from '@/Components/Title';
import { ROLE } from '@/const/role';
import i18n from '@/i18n';
import { Link } from '@inertiajs/inertia-react';
import { Modal, Table } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddCake from '../Cake/AddCake';

const renderAction = (role, id, name) => {
    const [t] = useTranslation();
    var content = <></>;

    const [openModal, setOpenModal] = useState(false);
    const showModal = () => {
        setOpenModal(true);
    };
    const handleCancel = () => {
        setOpenModal(false);
    };
    const handelOk = () => {
        setOpenModal(false);
        location.pathname = location.pathname;
    };
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
        content = (
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
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                    onClick={showModal}
                >
                    <span>{t('addNewCake')}</span>
                </button>
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
        content = (
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
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2 ml-2"
                    onClick={showModal}
                >
                    <span>{t('addNewCake')}</span>
                </button>
            </div>
        );
    }

    content = (
        <>
            {content}
            <Modal
                open={openModal}
                onCancel={handleCancel}
                footer={<></>}
                style={{
                    height: '500px'
                }}
            >
                <div>
                    <AddCake
                        id={id}
                        name={name}
                        onOk={handelOk}
                        onCancel={handleCancel}
                    />
                </div>
            </Modal>
        </>
    );

    return content;
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
            dataIndex: 'quantity',
            width: '10%'
        },
        {
            title: t('Action'),
            dataIndex: 'action',
            width: '25%'
        }
    ];
    const dataSource = [];

    cakes.data.map((e) => {
        dataSource.push({
            name: e.name,
            description: e.description,
            action: renderAction(
                auth.user != null ? auth.user.role_id : ROLE.USER,
                e.id,
                e.name
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
