import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { useSnackbar } from '@/components/snackbar';
import { PATH_API } from "@/routes/paths";
import { fetchProducts } from "@/utils/httpClient";
import { IProductFilter } from "@/@types/product";

export default function useProduct() {
    const { enqueueSnackbar } = useSnackbar()
    const queryClient = useQueryClient()
    const [query, setQuery] = useState<IProductFilter>({ page: 1, pageSize: 10, isHidden: false })

    const getProducts = useCallback(() => {
        return useQuery({
            queryKey: [PATH_API.product, query],
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