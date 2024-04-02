import React from 'react';
import styled from 'styled-components';
import { Link } from '@inertiajs/inertia-react';
import { Button } from 'antd';
import Dropdown from './Dropdown';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { ROLE } from '@/const/role';
import axios from 'axios';
import i18n from '@/i18n';
import Cart from './Cart/Cart';

const NavWrapper = styled.nav`
    background: var(--mainBlue);
    .nav-link {
        color: var(--mainWhite) !important;
        font-size: 1.3rem;
        text-transform: capitalize !important;
    }
`;

const Navbar = ({ auth }) => {
    const [t] = useTranslation();
    const roleId = auth.user != null ? auth.user.role_id : ROLE.USER;
    const handelLogout = async () => {
        const res = await axios.post(route('logout'), {
            headers: {
                'X-localization': i18n.language
            }
        });
        location.pathname = '/';
    };
    return (
        <>
            <NavWrapper className="flex navbar navbar-expand-sm navbar-dark px-sm-5 justify-content-between min-h-fit">
                <ul className="navbar-nav align-items-center">
                    <li className="ml-5 nav-item">
                        <span
                            className="text-3xl font-extrabold cursor-default"
                            onClick={() => (location.pathname = '/')}
                        >
                            CakeShop
                        </span>
                    </li>
                    <li className="ml-5 nav-item hover:bg-gray-200">
                        <Link
                            href={route('cake-types.index')}
                            className="nav-link"
                        >
                            {t('Cake Types')}
                        </Link>
                    </li>

                    <li className="ml-5 nav-item">
                        <Link
                            href={route('landing')}
                            className="nav-link hover:bg-gray-200"
                        >
                            {t('Cakes')}
                        </Link>
                    </li>
                    {roleId == ROLE.ADMIN ? (
                        <>
                            <Dropdown className="nav-item">
                                <Dropdown.Trigger>
                                    <div className="px-1 py-2 ml-5 text-xl hover:bg-gray-200 hover:cursor-pointer">
                                        {t('Manage')}
                                    </div>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Link
                                        href={route('cakes.manager.index')}
                                        className="nav-link hover:bg-gray-200"
                                    >
                                        {t('CakeAdmin')}
                                    </Link>
                                    <Link
                                        href={route('admin.ingredients.index')}
                                        className="nav-link hover:bg-gray-200"
                                    >
                                        {t('Ingredients')}
                                    </Link>
                                    <Link
                                        href={route('admin.users.index')}
                                        className="nav-link hover:bg-gray-200"
                                    >
                                        {t('ListAccount')}
                                    </Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </>
                    ) : (
                        <></>
                    )}
                    {roleId == ROLE.EMPLOYEE ? (
                        <>
                            <Dropdown className="nav-item">
                                <Dropdown.Trigger>
                                    <div className="px-1 py-2 ml-5 text-xl hover:bg-gray-200 hover:cursor-pointer">
                                        {t('Manage')}
                                    </div>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Link
                                        href={route('cakes.manager.index')}
                                        className="nav-link hover:bg-gray-200"
                                    >
                                        {t('CakeAdmin')}
                                    </Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </>
                    ) : (
                        <></>
                    )}
                    {roleId != ROLE.USER ? (
                        <>
                            <li className="ml-5 nav-item">
                                <Link
                                    href={route('orders.adminIndex')}
                                    className="nav-link hover:bg-gray-200"
                                >
                                    {t('ListOrders')}
                                </Link>
                            </li>
                        </>
                    ) : (
                        <></>
                    )}
                </ul>
                <div className="inline-flex">
                    <LanguageSwitcher className="mx-2 rounded-md cursor-pointer border-slate-200" />
                    {auth?.user ? (
                        <>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex mx-2 mt-1 rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                        >
                                            {auth.user.name}

                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <div className="m-2 d-flex justify-content-center">
                                        <Link
                                            href={route('users.show', {
                                                user: auth.user.id
                                            })}
                                        >
                                            <Button>{t('Account')}</Button>
                                        </Link>
                                    </div>
                                    <div className="m-2 d-flex justify-content-center">
                                        <Button onClick={handelLogout}>
                                            {t('Logout')}
                                        </Button>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                            <Cart className="mx-2 mt-1" />
                        </>
                    ) : (
                        <Button className="inline-flex mx-2 mt-1 rounded-md">
                            <Link href={route('login')}>{t('Login')}</Link>
                        </Button>
                    )}
                </div>
            </NavWrapper>
            <div className="h-px mb-5 bg-black"></div>
        </>
    );
};

export default Navbar;
