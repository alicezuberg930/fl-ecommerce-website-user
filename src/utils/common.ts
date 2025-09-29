import { AxiosError } from "axios"
import { toast } from "react-toastify"

export const handleErrorResponse = (error: any) => {
    if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message
        // toast.error(message)
        if (Array.isArray(message)) {
            throw new Error(`API Error: ${message.toString()} (Status: ${error.response?.status || 'N/A'})`)
        } else {
            throw new Error(`API Error: ${message} (Status: ${error.response?.status || 'N/A'})`)
        }
    } else {
        // toast.error(error.message)
        throw new Error(`Unexpected error while fetching data: ${(error instanceof Error ? error.message : String(error))}`)
    }
}