import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"
import { PATH_API } from "@/routes/paths";
import { fetchBrands } from "@/utils/httpClient";

export default function useBrand() {
    const getBrands = useCallback(() => {
        return useQuery({
            queryKey: [PATH_API.brand],
            queryFn: () => fetchBrands(),
            placeholderData: (previousData, _) => previousData,
        })
    }, [])

    return {
        getBrands
    }

}