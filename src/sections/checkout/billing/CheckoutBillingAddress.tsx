import { useState } from 'react'
// @mui
import { Grid, Button, Stack } from '@mui/material'
// @types
import { ICheckoutBillingAddress, ICheckoutBillingAddressItem, IProductCheckoutState } from '@/@types/product'
// components
import Iconify from '@/components/iconify'
//
import CheckoutSummary from '../CheckoutSummary'
import CheckoutBillingNewAddressForm from './CheckoutBillingNewAddressForm'
import CheckoutBillingAddressList from './CheckoutBillingAddressList'

// ----------------------------------------------------------------------

type Props = {
  addresses?: ICheckoutBillingAddressItem[]
  checkout: IProductCheckoutState
  onBackStep: VoidFunction
  onCreateBilling: (address: ICheckoutBillingAddress) => void
}

export default function CheckoutBillingAddress({ addresses, checkout, onBackStep, onCreateBilling }: Props) {
  const { total, discount, subTotal } = checkout

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 9 }}>
          {addresses && (
            <CheckoutBillingAddressList
              addresses={addresses}
              onCreateBilling={(address) => onCreateBilling(address)}
            />
          )}

          <Stack direction="row" justifyContent="space-between">
            <Button
              size="small"
              color="inherit"
              onClick={onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Back
            </Button>

            <Button
              size="small"
              variant="soft"
              onClick={handleOpen}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Thêm địa chỉ
            </Button>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <CheckoutSummary
            subtotal={subTotal}
            total={total}
            discount={discount}
          />
        </Grid>
      </Grid>

      <CheckoutBillingNewAddressForm
        open={open}
        onClose={handleClose}
        onCreateBilling={onCreateBilling}
      />
    </>
  )
}