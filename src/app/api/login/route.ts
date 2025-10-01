import { API_ENDPOINT } from '@/routes/api'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()
        const response = await fetch(`${process.env.BASE_API}${API_ENDPOINT.auth.login}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        const result = await response.json()
        const { accessToken } = result.data
        if (accessToken) {
            const response = NextResponse.json(result)
            response.cookies.set('accessToken', accessToken, {
                httpOnly: true,
                path: '/',
                // maxAge: 60 * 60 * 24,
                secure: true,
                sameSite: 'lax',
            })
            return response
        }
    } catch (error) {
        return NextResponse.json(error instanceof Error && error.message)
    }
}