import RevenueChart from '@/Components/Revenue/RevenueChart';
import TopCakeList from '@/Components/Revenue/TopCakeList';
import Title from '@/Components/Title';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Dashboard({ auth, topCakes }) {
    const [t] = useTranslation();
    return (
        <Authenticated auth={auth}>
            <Head title={t('Revenue')} />
            <Title name={t('Revenue')} />
            <div className="space-y-[9rem]">
                <div className="flex space-x-4 w-[1500px] mb-[3rem]">
                    <div className="w-[72%] h-[500px] rounded-3xl">
                        <h3 className="font-bold">{t('months')}</h3>
                        <RevenueChart picker="month" />
                    </div>
                    <TopCakeList topCakes={topCakes} />
                </div>
                <div className="flex">
                    <div className="w-[50%] h-[400px] rounded-3xl">
                        <h3 className="font-bold">{t('quarters')}</h3>
                        <RevenueChart picker="quarter" />
                    </div>
                    <div className="w-[50%] h-[400px] rounded-3xl">
                        <h3 className="font-bold">{t('years')}</h3>
                        <RevenueChart picker="year" />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
