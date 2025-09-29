import OrderDetails from "../components/OrderDetails"

const OrderDetailsPage: React.FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
    const id = await (await params).id

    return (<OrderDetails id={id} />)
}

export default OrderDetailsPage