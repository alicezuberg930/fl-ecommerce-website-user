import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json({ message: 'Cookie cleared' })

    response.headers.set(
        'Set-Cookie',
        `token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
    )

    return response
}
