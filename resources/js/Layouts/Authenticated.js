import React from 'react';
import Navbar from '@/Components/Navbar';

export default function Authenticated({ auth, children }) {
    return (
        <>
            <Navbar auth={auth} />
            <div className=" flex justify-center min-w-fit">
                <div>{children}</div>
            </div>
        </>
    );
}
