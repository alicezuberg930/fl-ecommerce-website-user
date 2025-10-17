import OrderDetails from "../components/OrderDetails"

const OrderDetailsPage: React.FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
    const { id } = await params

    return <OrderDetails id={id} />
}

export default OrderDetailsPage