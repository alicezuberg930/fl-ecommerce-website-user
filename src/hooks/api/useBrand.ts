import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"
import { API_ENDPOINT } from "@/routes/api";
import { fetchBrands } from "@/utils/httpClient";

export default function useBrand() {
    const getBrands = useCallback(() => {
        return useQuery({
            queryKey: [API_ENDPOINT.brand],
            queryFn: () => fetchBrands(),
            placeholderData: (previousData, _) => previousData,
        })
    }, [])

    return {
        getBrands
    }

}