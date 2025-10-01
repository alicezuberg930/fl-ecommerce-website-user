'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import FormProvider, { RHFTextField } from '@/components/hook-form'
import { Card, Container, Grid, Link, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import NextLink from 'next/link'
import useAuth from '@/hooks/useAuth'

type FormValuesProps = {
    phone: string
    password: string
    confirmPassword: string
    email: string
    name: string
}

export default function SignUpPage() {
    const { signUp } = useAuth()
    const signUpMutate = signUp()

    const SignupSchema = Yup.object().shape({
        phone: Yup.string().required('Nhập số điện thoại').matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
        password: Yup.string().required('Nhập mật khẩu').min(6, 'Mật khẩu cần ít nhất 6 ký tự'),
        confirmPassword: Yup.string().required('Nhập lại mật khẩu').oneOf([Yup.ref('password')], 'Mật khẩu không khớp'),
        email: Yup.string().required('Nhập email').email('Định dạng email không hợp lệ'),
        name: Yup.string().required('Nhập tên người dùng'),
    })

    const defaultValues = useMemo(() => ({
        phone: '',
        password: '',
        confirmPassword: '',
        email: '',
        name: ''
    }), [])

    const methods = useForm<FormValuesProps>({
        resolver: yupResolver(SignupSchema),
        defaultValues,
    })

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods

    const onSubmit = async (data: FormValuesProps) => {
        signUpMutate.mutate({ data })
    }

    return (
        <Container maxWidth='md'>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{
                    py: 3, my: 8, px: { xs: 2, lg: 12 }
                }}>
                    <Typography variant='h3' textAlign='center'>Đăng ký</Typography>
                    <Grid container rowGap={4} mt={8}>
                        <Grid size={12}>
                            <RHFTextField name='name' label='Tên người dùng' />
                        </Grid>
                        <Grid size={12}>
                            <RHFTextField name='phone' label='Số điện thoại' />
                        </Grid>
                        <Grid size={12}>
                            <RHFTextField name='email' label='Email' />
                        </Grid>
                        <Grid size={12}>
                            <RHFTextField name='password' type='password' label='Mật khẩu' />
                        </Grid>
                        <Grid size={12}>
                            <RHFTextField name='confirmPassword' type='password' label='Nhập lại mật khẩu' />
                        </Grid>
                    </Grid>

                    <Stack sx={{ mt: 4 }}>
                        <LoadingButton fullWidth type='submit' variant='contained' color='info' loading={isSubmitting}>
                            Đăng ký
                        </LoadingButton>
                    </Stack>

                    <Stack direction='row' alignItems='center' justifyContent='center' spacing={1} mt={4}>
                        <Typography>Đã có tài khoản?</Typography>
                        <Link component={NextLink} href='/login' fontWeight='bold' color='info'>
                            đăng nhập
                        </Link>
                    </Stack>
                </Card>
            </FormProvider>
        </Container>
    )
}