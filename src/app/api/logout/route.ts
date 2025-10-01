import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies()
        cookieStore.delete('accessToken')
        return NextResponse.json({ message: 'Logged out successfully' })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Logout failed' },
            { status: 500 }
        )
    }
}