import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/inertia-react';
import ListItemInCategory from '@/Components/Category/ListItemInCategory';
import Authenticated from '@/Layouts/Authenticated';
import { useTranslation } from 'react-i18next';

export default function Welcome(props) {
    const [data, setData] = useState(null);
    const [t] = useTranslation();
    useEffect(() => {
        const loadData = async () => {
            const res = await axios.get(route('api.cakes.groupByType'));
            setData(res.data);
        };
        loadData();
    }, []);
    const content = [];
    if (data) {
        for (const [key, value] of Object.entries(data)) {
            content.push(<ListItemInCategory items={value} key={key} />);
        }
    }
    return (
        <Authenticated auth={props.auth}>
            <Head title={t('HomePage')} />
            <div className="flex flex-col align-items-center space-y-7">
                {content}
            </div>
        </Authenticated>
    );
}
