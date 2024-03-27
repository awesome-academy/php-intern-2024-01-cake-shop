import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Title from '@/Components/Title';
import i18n from '@/i18n';
import { Button, InputNumber } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AddCake({ id, name, onOk, onCancel }) {
    const [t] = useTranslation();
    const [amount, setAmount] = useState(0);
    const submit = async () => {
        const data = {
            amount: amount
        };
        const res = await axios.post(
            route('api.cakes.addCake', {
                cake: id
            }),
            data,
            {
                headers: {
                    'X-localization': i18n.language
                }
            }
        );
        onOk();
    };
    return (
        <div className=" h-[13rem]">
            <Title title={t('addCake')} />
            <div className="d-flex flex-column w-50 h-20 m-auto">
                <div className="mb-[5px]">
                    {t('Name')}: {name}
                </div>
                <Label
                    forInput="amount"
                    value={t('AddAmount')}
                    className="m-2"
                />
                <InputNumber
                    name="amount"
                    value={amount}
                    className="mt-1 block w-full m-2"
                    isFocused={true}
                    min={0}
                    onChange={(e) => {
                        setAmount(e);
                    }}
                    required
                />
                <div className="w-full flex justify-between mt-2">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                        onClick={submit}
                    >
                        {t('ok')}
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded"
                    >
                        {t('Cancel')}
                    </button>
                </div>
            </div>
        </div>
    );
}
