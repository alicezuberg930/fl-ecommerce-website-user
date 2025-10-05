import * as Yup from 'yup'
// form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// @mui
import { Grid, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
// @types
import {
  ICheckoutCardOption,
  ICheckoutPaymentOption,
  ICheckoutDeliveryOption,
  IProductCheckoutState,
} from '@/@types/product'
// components
import Iconify from '@/components/iconify'
import FormProvider from '@/components/hook-form'
//
import CheckoutSummary from '../CheckoutSummary'
import CheckoutDelivery from './CheckoutDelivery'
import CheckoutBillingInfo from './CheckoutBillingInfo'
import CheckoutPaymentMethods from './CheckoutPaymentMethods'

// ----------------------------------------------------------------------

const DELIVERY_OPTIONS: ICheckoutDeliveryOption[] = [
  {
    value: 0,
    title: 'Vận chuyển bình thường (Free)',
    description: 'Giao sau 5-10 ngày',
  },
  {
    value: 100000,
    title: 'Vận chuyển hỏa tốc (100.000đ)',
    description: 'Giao vào ngày mai',
  },
]

const PAYMENT_OPTIONS: ICheckoutPaymentOption[] = [
  {
    value: 'momo',
    title: 'Momo',
    description: 'Bạn sẽ được điều hướng đến Momo website để hoàn thành thanh toán.',
    icons: ['./assets/icons/payments/ic_paypal.svg'],
  },
  {
    value: 'vnpay',
    title: 'VNPay',
    description: 'Bạn sẽ được điều hướng đến VNPay website để hoàn thành thanh toán.',
    icons: ['./assets/icons/payments/ic_paypal.svg'],
  },
  {
    value: 'onepay',
    title: 'Onepay',
    description: 'Bạn sẽ được điều hướng đến Onepay website để hoàn thành thanh toán.',
    icons: ['./assets/icons/payments/ic_paypal.svg'],
  },
  {
    value: 'sepay',
    title: 'SePay',
    description: 'Bạn sẽ được điều hướng đến SePay website để hoàn thành thanh toán.',
    icons: ['./assets/icons/payments/ic_paypal.svg'],
  },
  // {
  //   value: 'credit_card',
  //   title: 'Thẻ tín dụng/Ghi nợ Card',
  //   description: 'Thẻ tín dụng Mastercard, Visa.',
  //   icons: ['./assets/icons/payments/ic_mastercard.svg', './assets/icons/payments/ic_visa.svg'],
  // },
  {
    value: 'cash',
    title: 'Tiền mặt',
    description: 'Trả bằng tiền mặt khi đơn của bạn được giao.',
    icons: [],
  },
]

const CARDS_OPTIONS: ICheckoutCardOption[] = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
]

type Props = {
  checkout: IProductCheckoutState
  onNextStep: VoidFunction
  onBackStep: VoidFunction
  onGotoStep: (step: number) => void
  onApplyShipping: (value: number) => void
  onApplyPaymentMethod: (value: string) => void
}

type FormValuesProps = {
  delivery?: number
  payment: string
}

export default function CheckoutPayment({
  checkout,
  onNextStep,
  onBackStep,
  onGotoStep,
  onApplyShipping,
  onApplyPaymentMethod
}: Props) {
  const { total, discount, subTotal, shipping, billing } = checkout

  const PaymentSchema = Yup.object().shape({
    payment: Yup.string().required('Payment is required!'),
  })

  const defaultValues = {
    delivery: shipping,
    payment: '',
  }

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async () => {
    try {
      onNextStep()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 9 }}>
          <CheckoutDelivery onApplyShipping={onApplyShipping} deliveryOptions={DELIVERY_OPTIONS} />

          <CheckoutPaymentMethods
            onApplyPaymentMethod={onApplyPaymentMethod}
            cardOptions={CARDS_OPTIONS}
            paymentOptions={PAYMENT_OPTIONS}
            sx={{ my: 3 }}
          />

          <Button
            size='small'
            color='inherit'
            onClick={onBackStep}
            startIcon={<Iconify icon='eva:arrow-ios-back-fill' />}
          >
            Back
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <CheckoutBillingInfo onBackStep={onBackStep} billing={billing} />

          <CheckoutSummary
            enableEdit
            total={total}
            subtotal={subTotal}
            discount={discount}
            shipping={shipping}
            onEdit={() => onGotoStep(0)}
          />

          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            loading={isSubmitting}
          >
            Hoàn thành đơn
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
