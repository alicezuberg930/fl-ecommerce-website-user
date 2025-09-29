import { API_ENDPOINT } from '@/routes/api';
import { axiosInstance } from '@/utils/axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { phone, password } = await req.json();
    const res = await axiosInstance.post(API_ENDPOINT.auth.login, { phone, password });
    const { token } = res.data;
    if (token) {
        const response = NextResponse.json({ token });

        response.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24,
            secure: true,
            sameSite: 'lax',
        });
        return response;
    }
}
