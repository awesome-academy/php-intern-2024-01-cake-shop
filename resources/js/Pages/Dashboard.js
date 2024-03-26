import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { t } from 'i18next';

export default function Dashboard(props) {
    const { users } = props;
    return (
        <Authenticated auth={props.auth}>
            <Head title="Dashboard" />
            <div className="p-6 bg-white border-b border-gray-200">
                {t('LogedNoti')}
            </div>
        </Authenticated>
    );
}
