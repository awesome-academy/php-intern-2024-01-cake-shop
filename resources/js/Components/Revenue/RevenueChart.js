import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import DateRangePicker from '../DateRangePicker';
import dayjs from 'dayjs';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
    Legend
);
export default function RevenueChart({ picker = 'month' }) {
    const [t] = useTranslation();
    const [dayStart, setDayStart] = useState(dayjs());
    const [dayEnd, setDayEnd] = useState(dayjs());
    const [dataSource, setDataSource] = useState([]);
    const [labels, setLabels] = useState([]);

    const handleLoadData = async () => {
        const res = await axios.get(
            route('api.statistical.revenue', {
                picker: picker
            }),
            {
                params: {
                    startMonth: dayStart.month() + 1,
                    startYear: dayStart.year(),
                    endMonth: dayEnd.month() + 1,
                    endYear: dayEnd.year()
                }
            }
        );
        setDataSource(res.data.totals);
        setLabels(res.data.labels);
    };

    useEffect(() => {
        handleLoadData();
    }, [dayEnd, dayStart]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    };

    const data = {
        labels: labels,
        datasets: [
            {
                fill: true,
                label: t('Revenue'),
                data: dataSource,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
        ]
    };

    return (
        <>
            <div>
                <DateRangePicker
                    dayStart={dayStart}
                    dayEnd={dayEnd}
                    onChange={(start, end) => {
                        setDayEnd(end);
                        setDayStart(start);
                    }}
                    picker={picker}
                />
            </div>
            <Line options={options} data={data} />
        </>
    );
}
