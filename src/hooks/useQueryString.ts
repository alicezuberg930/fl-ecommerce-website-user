import { useCallback } from "react"
import { useSearchParams } from "next/navigation"

type ReturnType = (name: string, value: string | null) => string

export default function useQueryString(): ReturnType {
    const searchParams = useSearchParams()

    const createQueryString = useCallback((name: string, value: string | null): string => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === null) {
            params.delete(name)
        } else {
            params.set(name, value)
        }
        return params.toString()
    }, [searchParams])

    return createQueryString
}