import { PATH_API } from '@/routes/paths'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get('accessToken')?.value || null
        const response = await fetch(`${process.env.BASE_API}${PATH_API.user.profile}`, {
            method: "GET",
            cache: "force-cache",
            next: { tags: ['profile'] },
            headers: { "Authorization": `Bearer ${accessToken}` }
        })
        const result = await response.json()
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(error instanceof Error && error.message)
    }
}