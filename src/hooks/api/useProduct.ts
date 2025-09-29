import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { useSnackbar } from '@/components/snackbar';
import { API_ENDPOINT } from "@/routes/api";
import { fetchProducts } from "@/utils/httpClient";
import { QueryProduct } from "@/@types/product";

export default function useProduct() {
    const { enqueueSnackbar } = useSnackbar()
    const queryClient = useQueryClient()
    const [query, setQuery] = useState<QueryProduct>({ page: 1, pageSize: 10, isHidden: false })

    const getProducts = useCallback(() => {
        return useQuery({
            queryKey: [API_ENDPOINT.product, query],
            queryFn: () => fetchProducts({ query }),
            placeholderData: (previousData, _) => previousData,
        })
    }, [query])

    return {
        getProducts,
        query,
        setQuery
    }

}