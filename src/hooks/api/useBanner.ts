import { useQuery } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { API_ENDPOINT } from "@/routes/api";
import { fetchCategories } from "@/utils/httpClient";

export default function useBanner() {
    const getCategories = useCallback(() => {
        return useQuery({
            queryKey: [API_ENDPOINT.category],
            queryFn: () => fetchCategories(),
            placeholderData: (previousData, _) => previousData,
        })
    }, [])

    return {
        getCategories,
    }
}