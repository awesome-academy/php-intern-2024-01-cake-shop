import React, { useEffect, useState } from 'react';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import Guest from '@/Layouts/Guest';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { t } from 'i18next';
import axios from 'axios';
import i18n from '@/i18n';

export default function Login({ status, canResetPassword }) {
    const [errors, setErrors] = useState({});
    const { data, setData, post, processing, reset } = useForm({
        email: '',
        password: '',
        remember: ''
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        const f = async () => {
            try {
                const res = await axios.post(route('login'), data, {
                    headers: {
                        'X-localization': i18n.language
                    }
                });
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    axios.defaults.headers.Authorization =
                        'Bearer ' + res.data.token;
                }
                location.pathname = '/';
            } catch (e) {
                setErrors(e.response.data.errors);
            }
        };
        f();
    };

    return (
        <Guest>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div>
                    <Label forInput="email" value="Email" />

                    <Input
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            handleChange={onHandleChange}
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            {t('Remember Me')}
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('register')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 mr-auto"
                    >
                        {t('Register')}
                    </Link>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            {t('Forgot Your Password?')}
                        </Link>
                    )}
                    <Button className="ml-4" processing={processing}>
                        Login
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
