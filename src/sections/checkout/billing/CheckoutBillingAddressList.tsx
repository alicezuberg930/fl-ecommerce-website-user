import { ICheckoutBillingAddress } from "@/@types/product"
import CheckoutBillingAddressItem from "./CheckoutBillingAddressItem"

type AddressListProps = {
    addresses: ICheckoutBillingAddress[]
    onCreateBilling: (address: ICheckoutBillingAddress) => void
}

export default function CheckoutBillingAddressList({ addresses, onCreateBilling }: AddressListProps) {
    return (
        <>
            {addresses.map((address, index) => (
                <CheckoutBillingAddressItem
                    key={index}
                    address={address}
                    onCreateBilling={() => onCreateBilling(address)}
                />
            ))}
        </>
    )
}