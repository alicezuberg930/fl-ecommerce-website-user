import VerifyPage from "@/page/VerifyPage"
import createSEO from "@/utils/seo"

export const metadata = createSEO({
    title: 'Xác thực',
    openGraph: { url: '/verify' }
})

export default function page() {
    return (
        <VerifyPage />
    )
}