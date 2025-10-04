import { useQuery } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { PATH_API } from "@/routes/paths";
import { fetchCategories } from "@/utils/httpClient";

export default function useBanner() {
    const getCategories = useCallback(() => {
        return useQuery({
            queryKey: [PATH_API.category],
            queryFn: () => fetchCategories(),
            placeholderData: (previousData, _) => previousData,
        })
    }, [])

    return {
        getCategories,
    }
}