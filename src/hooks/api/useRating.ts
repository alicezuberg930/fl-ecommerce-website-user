import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { useSnackbar } from '@/components/snackbar';
import { API_ENDPOINT } from "@/routes/api";
import { fetchRatings } from "@/utils/httpClient";
import { QueryRating } from "@/@types/rating";

export default function useRating() {
    const { enqueueSnackbar } = useSnackbar()
    const queryClient = useQueryClient()
    const [query, setQuery] = useState<QueryRating>({ page: 1, pageSize: 10 })

    const getRatings = useCallback(() => {
        return useQuery({
            queryKey: [API_ENDPOINT.rating, query],
            queryFn: () => fetchRatings({ query }),
            placeholderData: (previousData, _) => previousData,
        })
    }, [query])

    return {
        getRatings,
        query,
        setQuery
    }

}