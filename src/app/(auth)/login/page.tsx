import LoginPage from "@/page/LoginPage"
import createSEO from "@/utils/seo"

export const metadata = createSEO({
  title: 'Đăng nhập',
  openGraph: { url: '/login' }
})

export default function page() {
  return (
    <LoginPage />
  )
}