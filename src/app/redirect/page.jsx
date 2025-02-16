"use client"
import React, { useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const roleRedirectMap = {
  admin: '/admin/orders',

};

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        const handleRoleBasedRedirect = () => {
            if (status === 'authenticated' && session?.user?.roles) {
                // Get the first role from the user's roles array
                const primaryRole = session.user.roles[2];
                
                // Get the redirect path from the map, default to dashboard if role not found
                const redirectPath = roleRedirectMap[primaryRole] || '/user';
                
                router.push(redirectPath);
            } else if (status === 'unauthenticated') {
                // Redirect to login if user is not authenticated
                router.push('/login');
            }
        };

        handleRoleBasedRedirect();
    }, [session, status, router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-xl font-semibold">Redirecting...</h1>
        </div>
    );
};