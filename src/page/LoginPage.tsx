'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import FormProvider, { RHFTextField } from '@/components/hook-form'
import { Button, Card, Container, Grid, Link, Stack, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import NextLink from 'next/link'
import { useAuthContext } from '@/auth/useAuthContext'
import { PATH_AUTH } from '@/routes/paths'

type FormValuesProps = {
    username: string
    password: string
}

export default function LoginPage() {
    const { login, loginWithProvider } = useAuthContext()

    const LoginSchema = Yup.object().shape({
        username: Yup.string().required('Nhập số điện thoại'),
        password: Yup.string().required('Nhập mật khẩu').min(6, 'Mật khẩu cần ít nhất 6 ký tự')
    })

    const defaultValues = useMemo(() => ({
        username: '',
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
        await login(data.username, data.password)
    }

    return (
        <Container maxWidth='sm'>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Card sx={{ py: 3, my: 8, px: { xs: 2, lg: 6 } }}>
                    <Typography variant='h3' textAlign='center'>Đăng nhập</Typography>
                    <Grid container rowGap={6} mt={8}>
                        <Grid size={12}>
                            <RHFTextField name='username' label='Tên người dùng' />
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

                    <Grid container mt={3} spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Button fullWidth variant='contained' color='inherit' onClick={() => loginWithProvider('google')}>
                                Đăng nhập bằng google
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Button fullWidth variant='contained' color='secondary' onClick={() => loginWithProvider('facebook')}>
                                Đăng nhập bằng facebook
                            </Button>
                        </Grid>
                    </Grid>
                    <Stack sx={{ mt: 3, gap: 1, flexWrap: 'wrap' }} alignContent={'space-around'} direction={'row'}>


                    </Stack>

                    <Stack direction='row' alignItems='center' justifyContent='center' spacing={1} mt={6}>
                        <Typography variant='caption'>Không có tài khoản? </Typography>
                        <Link variant='caption' component={NextLink} href={PATH_AUTH.register} fontWeight='bold' color='info'>
                            tạo mới
                        </Link>
                    </Stack>
                </Card>
            </FormProvider>
        </Container>
    )
}