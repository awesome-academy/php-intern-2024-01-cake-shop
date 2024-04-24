import { DatePicker } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DateRangePicker({
    dayStart,
    dayEnd,
    onChange,
    picker = 'month'
}) {
    const [t] = useTranslation();
    const handleChange = (e, type) => {
        if (e <= dayEnd && type === 1) {
            onChange(e, dayEnd);
            return;
        }
        if (e >= dayStart && type === 2) {
            onChange(dayStart, e);
            return;
        }
    };
    return (
        <div className="flex justify-center pl-10 space-x-3">
            <span>
                {t('Start')}:{' '}
                <DatePicker
                    value={dayStart}
                    onChange={(e) => {
                        handleChange(e, 1);
                    }}
                    picker={picker}
                    allowClear={false}
                />
            </span>
            <span>
                {t('End')}:{' '}
                <DatePicker
                    value={dayEnd}
                    onChange={(e) => {
                        handleChange(e, 2);
                    }}
                    picker={picker}
                    allowClear={false}
                />
            </span>
        </div>
    );
}
