import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminPage = nextUrl.pathname.startsWith('/admin');
            const isStatsPage = nextUrl.pathname.startsWith('/statistics');

            if (isAdminPage || isStatsPage) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // If logged in and trying to access login page, redirect to admin
                if (nextUrl.pathname === '/login') {
                    return Response.redirect(new URL('/admin', nextUrl));
                }
                return true;
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
