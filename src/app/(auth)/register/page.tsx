import SignUpPage from "@/page/SignUpPage";
import createSEO from "@/utils/seo";

export const metadata = createSEO({
  title: 'Đăng ký',
  openGraph: { url: '/register' }
})

export default function page() {
  return (
    <SignUpPage />
  )
}