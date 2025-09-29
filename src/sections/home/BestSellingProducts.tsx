'use client'
import ProductCard from '@/app/components/ProductCard'
import CustomPaginator from '@/app/components/CustomPaginator'
import '@/app/styles/css/products.for.you.css'
import LoadingShimmer from '@/app/components/LoadingShimmer'
import useProduct from '@/hooks/api/useProduct'
import { Container, Typography } from '@mui/material'

export default function BestSellingProducts() {
    const { setQuery, getProducts } = useProduct()
    const { data: response, isLoading, isError, error } = getProducts()

    const handleChangePage = (page: number) => setQuery(prev => ({ ...prev, page }))

    return (
        <div className='products-for-you-wrapper'>
            <div className='products-for-you-title'>
                <h1>Sản phẩm bán chạy</h1>
            </div>
            {error && (
                <Container maxWidth="xl">
                    <Typography variant="h4" textAlign="center">
                        {error.message}
                    </Typography>
                </Container>
            )}
            {isLoading && !isError ? (
                <LoadingShimmer />
            ) : (
                <>
                    {response?.data && (
                        <div className='products-container'>
                            {response?.data && response.data.map(product => (
                                <ProductCard key={product._id} product={product} aspectRatio={'1/1'} />
                            ))}
                        </div>
                    )}
                    {response?.paginate && (
                        <div className='paginator-container'>
                            <CustomPaginator
                                page={response.paginate.currentPage}
                                totalPages={response.paginate.totalPages}
                                handleChangePage={handleChangePage}
                            />
                        </div>
                    )}
                </>
            )}
        </div >
    )
}