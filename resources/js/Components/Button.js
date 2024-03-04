import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Button({
    type = 'submit',
    className = '',
    processing,
    children
}) {
    const [t] = useTranslation();
    var children2 = typeof children === 'string' ? t(children) : children;

    return (
        <button
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children2}
        </button>
    );
}
