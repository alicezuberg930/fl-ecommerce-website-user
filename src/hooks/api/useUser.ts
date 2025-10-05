import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { PATH_API } from "@/routes/paths";
import {
    fetchDeliveryAddresses,
    createDeliveryAddress as createDeliveryAddressAPI,
    deleteDeliveryAddress as deleteDeliveryAddressAPI
} from "@/utils/httpClient";
import { ICheckoutBillingAddress } from "@/@types/product";
import { useSnackbar } from "@/components/snackbar";

export default function useUser() {
    const { enqueueSnackbar } = useSnackbar()
    const queryClient = useQueryClient()

    const createDeliveryAddress = useCallback(() => {
        return useMutation({
            mutationFn: ({ address }: { address: ICheckoutBillingAddress }) => createDeliveryAddressAPI({ address }),
            onSuccess(data) {
                enqueueSnackbar(data.message)
                queryClient.invalidateQueries({ queryKey: [PATH_API.user.address.list] })
            },
            onError(error) {
                enqueueSnackbar(error instanceof Error ? error.message : 'Internal Server Error', { variant: 'error' })
            },
        })
    }, [])

    const getDeliveryAddresses = useCallback(() => {
        return useQuery({
            queryKey: [PATH_API.user.address.list],
            queryFn: () => fetchDeliveryAddresses(),
            placeholderData: (previousData, _) => previousData,
        })
    }, [])

    const deleteDeliveryAddress = useCallback(() => {
        return useMutation({
            mutationFn: ({ id }: { id: string }) => deleteDeliveryAddressAPI({ id }),
            onSuccess(data) {
                enqueueSnackbar(data.message)
                queryClient.invalidateQueries({ queryKey: [PATH_API.user.address.list] })
            },
            onError(error) {
                enqueueSnackbar(error instanceof Error ? error.message : 'Internal Server Error', { variant: 'error' })
            },
        })
    }, [])

    return {
        getDeliveryAddresses,
        createDeliveryAddress,
        deleteDeliveryAddress
    }

}