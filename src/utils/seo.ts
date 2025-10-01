import type { Metadata } from 'next'

export default function generateMetadaUtils({
    title = "Future Life",
    description = "Công ty Cổ phần Thương mại và Phát triển Future Life là thương hiệu tiên phong cung cấp giải pháp và sản phẩm chất lượng, nâng cao sức khỏe và vẻ đẹp cho gia đình bạn. Chúng tôi mang đến các sản phẩm dinh dưỡng, làm đẹp… từ những thương hiệu quốc tế uy tín. Future Life cam kết chất lượng chính hãng, đáp ứng mọi nhu cầu của khách hàng.",
    keywords = "thực phẩm chức năng, sức khỏe, dinh dưỡng, làm đẹp, e-commerce, sữa bột, chống lão hóa, thuốc mọc tóc",
    url = "https://futurelifeecom.com",
    image = "/assets/opengraph-image.jpg",
}): Metadata {
    const customUrl = `https://futurelifeecom.com${url}`

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            url: customUrl,
            images: [{ url: image }],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    }
}
