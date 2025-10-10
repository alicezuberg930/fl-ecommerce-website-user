import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ provider: string }> }) {
    try {
        const { provider } = await params
        return NextResponse.json({ provider })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Logout failed' },
            { status: 500 }
        )
    }
}