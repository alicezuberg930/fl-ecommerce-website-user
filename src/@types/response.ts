export interface APIResponse<D = any> {
    statusCode: number
    message: string
    data: D
    paginate?: {
        totalPages: number
        pageSize: number
        currentPage: number
    }
}