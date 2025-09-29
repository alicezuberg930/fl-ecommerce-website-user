'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import FormProvider, { RHFTextField } from '@/components/hook-form'
import { Card, Container, Grid, Link, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useSettingsContext } from '@/components/settings'
import NextLink from 'next/link'
import { useAuthContext } from '@/auth/useAuthContext'
import { useRouter } from 'next/navigation'
import { useSnackbar } from '@/components/snackbar'

type FormValuesProps = {
    phone: string
    password: string
}

export default function LoginPage() {
    const { login } = useAuthContext()
    const { themeStretch } = useSettingsContext()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useRouter()

    const LoginSchema = Yup.object().shape({
        phone: Yup.string().required('Nhập số điện thoại').matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
        password: Yup.string().required('Nhập mật khẩu').min(6, 'Mật khẩu cần ít nhất 6 ký tự')
    })

    const defaultValues = useMemo(() => ({
        phone: '',
        password: '',
    }), [])

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    })

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods

    const onSubmit = async (data: FormValuesProps) => {
        await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({
                phone: data.phone,
                password: data.password,
            }),
            credentials: 'include', // ✅ This is required to accept cookies from server
        });
        try {
            await login(data.phone, data.password);
            enqueueSnackbar('Đăng nhập thành công')
            navigate.push('/')
        } catch (error) {
            enqueueSnackbar('Sai thông tin hoặc lỗi server', { variant: 'error' })
        }
    }

    return (
        <Container maxWidth={themeStretch ? false : 'md'}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{
                    py: 3, my: 8, px: { xs: 2, lg: 12 }
                }}>
                    <Typography variant='h3' textAlign='center'>Đăng nhập</Typography>
                    <Grid container rowGap={6} mt={8}>
                        <Grid size={12}>
                            <RHFTextField name='phone' label='Số điện thoại' />
                        </Grid>
                        <Grid size={12}>
                            <RHFTextField name='password' type='password' label='Mật khẩu' />
                        </Grid>
                    </Grid>

                    <Stack sx={{ mt: 6 }}>
                        <LoadingButton fullWidth type='submit' variant='contained' color='info' loading={isSubmitting}>
                            Đăng nhập
                        </LoadingButton>
                    </Stack>

                    <Stack direction='row' alignItems='center' justifyContent='center' spacing={1} mt={6}>
                        <Typography>Không có tài khoản?</Typography>
                        <Link component={NextLink} href='/signup' fontWeight='bold' color='info'>
                            tạo mới
                        </Link>
                    </Stack>
                </Card>
            </FormProvider>
        </Container >
    )
}