import useUser from '@/hooks/api/useUser'
import * as Yup from 'yup'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
// form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// @mui
import {
  Box,
  Stack,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
// @types
import { ICheckoutBillingAddress } from '@/@types/product'
import { IDistrict, IProvince, IWard } from '@/@types/address'
// components
import FormProvider, {
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
} from '@/components/hook-form'
import { fetchDistricts, fetchProvinces, fetchWards } from '@/utils/httpClient'

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<ICheckoutBillingAddress, '_id'> { }

type Props = {
  open: boolean
  onClose: VoidFunction
  onCreateBilling: (address: Omit<ICheckoutBillingAddress, '_id'>) => void
}

export default function CheckoutBillingNewAddressForm({ open, onClose, onCreateBilling }: Props) {
  const { createDeliveryAddress } = useUser()
  const create = createDeliveryAddress()
  const [provinces, setProvince] = useState<IProvince[]>([])
  const [districts, setDistricts] = useState<IDistrict[]>([])
  const [wards, setWards] = useState<IWard[]>([])

  const NewAddressSchema = Yup.object().shape({
    contactName: Yup.string().required('Fullname is required'),
    contactPhone: Yup.string().required('Phone number is required'),
    province: Yup.string().required('City is required'),
    district: Yup.string().required('State is required'),
    ward: Yup.string().required('Country is required'),
    street: Yup.string().required('Country is required'),
  })

  const defaultValues = {
    contactName: '',
    contactPhone: '',
    province: '',
    district: '',
    ward: '',
    street: '',
    addressType: 'Home',
    isDefault: true,
  }

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  })

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods

  const values = watch()

  useEffect(() => {
    const getProvinces = async () => {
      const response = await fetchProvinces()
      setProvince(response.data || [])
    }
    getProvinces()
  }, [])

  useEffect(() => {
    const getDistricts = async () => {
      const response = await fetchDistricts({ id: values.province })
      setDistricts(response.data || [])
    }
    if (values.province) getDistricts()
  }, [values.province])

  useEffect(() => {
    const getWards = async () => {
      const response = await fetchWards({ id: values.district })
      setWards(response.data || [])
    }
    if (values.district) getWards()
  }, [values.district])

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const { contactName, contactPhone, street, ward, district, province, addressType, isDefault } = data
      const address: Omit<ICheckoutBillingAddress, '_id'> = {
        contactName, contactPhone, addressType, isDefault,
        province: provinces.find(p => p.code === province)?.fullName!,
        district: districts.find(d => d.code === district)?.fullName!,
        ward, street
      }
      onCreateBilling(address)
      create.mutate({ address })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add new address</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            <RHFRadioGroup
              row
              name="addressType"
              options={[
                { label: 'Home', value: 'home' },
                { label: 'Office', value: 'office' },
              ]}
            />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="contactName" label="Full Name" />

              <RHFTextField name="contactPhone" label="Phone Number" />
            </Box>

            <RHFTextField name="street" label="Street" />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFSelect native name="province" label="City / Province">
                <option value="" />
                {provinces && provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.fullName}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect native name="district" label="District">
                <option value="" />
                {districts && districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.fullName}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect native name="ward" label="Ward">
                <option value="" />
                {wards && wards.map((ward) => (
                  <option key={ward.code} value={ward.fullName}>
                    {ward.fullName}
                  </option>
                ))}
              </RHFSelect>

              {/* <RHFTextField name="district" label="District" /> */}

              {/* <RHFTextField name="ward" label="Ward" /> */}
            </Box>

            <RHFCheckbox name="isDefault" label="Use this address as default." sx={{ mt: 3 }} />
          </Stack>
        </DialogContent>

        <DialogActions>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Deliver to this Address
          </LoadingButton>

          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  )
}
