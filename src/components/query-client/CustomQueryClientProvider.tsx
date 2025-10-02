'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

const CustomQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: { queries: { staleTime: 3600 * 1000 } }
    }))

    return (
        <QueryClientProvider client={queryClient} >
            <ReactQueryStreamedHydration>
                {children}
            </ReactQueryStreamedHydration>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    )
}

export default CustomQueryClientProvider