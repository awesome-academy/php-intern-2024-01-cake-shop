import React from 'react';
import Navbar from '@/Components/Navbar';

export default function Authenticated({ auth, children }) {
    return (
        <>
            <Navbar auth={auth} />
            <div className="w-[100%] flex justify-center">
                <div>{children}</div>
            </div>
        </>
    );
}
