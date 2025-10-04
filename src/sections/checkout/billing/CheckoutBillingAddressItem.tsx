import { ICheckoutBillingAddress } from "@/@types/product"
import Label from "@/components/label"
import { Box, Button, Card, Stack, Typography } from "@mui/material"

type AddressItemProps = {
    address: ICheckoutBillingAddress
    onCreateBilling: VoidFunction
}

export default function CheckoutBillingAddressItem({ address, onCreateBilling }: AddressItemProps) {
    const { contactName, addressType, contactPhone, isDefault, street, ward, district, province } = address
    const fullAddress = `${street}, ${ward}, ${district}, ${province}`

    return (
        <Card sx={{ p: 3, mb: 3 }}>
            <Stack
                spacing={2}
                alignItems={{ md: 'flex-end' }}
                direction={{ xs: 'column', md: 'row' }}
            >
                <Stack flexGrow={1} spacing={1}>
                    <Stack direction="row" alignItems="center">
                        <Typography variant="subtitle1">
                            {contactName}
                            <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
                                ({addressType})
                            </Box>
                        </Typography>

                        {isDefault && (
                            <Label color="info" sx={{ ml: 1 }}>
                                Default
                            </Label>
                        )}
                    </Stack>

                    <Typography variant="body2">{fullAddress}</Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {contactPhone}
                    </Typography>
                </Stack>

                <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
                    <Button variant="outlined" size="small" onClick={onCreateBilling}>
                        Deliver to this Address
                    </Button>
                </Stack>
            </Stack>
        </Card>
    )
}
