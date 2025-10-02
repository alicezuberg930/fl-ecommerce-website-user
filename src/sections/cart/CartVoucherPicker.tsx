// utils
import { fCurrencyVND } from '@/utils/formatNumber'
import { fUnixToDate } from '@/utils/formatTime'
// @mui
import { Button, Stack, Typography, Box, Radio, RadioGroup, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
// hooks
import { useState } from 'react'

export default function CartVoucherPicker() {
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [selectedVoucher, setSelectedVoucher] = useState<string>('')

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleApplyVoucher = () => {
    }

    return (
        <>
            <Stack
                mb={2}
                justifyContent='space-between'
                direction='row'
                alignItems='center'
            >
                <Typography variant='body1'>FL voucher</Typography>
                <Button
                    variant='contained'
                    color='secondary'
                    sx={{ flexShrink: 0 }}
                    onClick={handleOpenDialog}
                >
                    Chọn
                </Button>
            </Stack>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth='sm'
                fullWidth
                scroll='paper'
            >
                <DialogTitle>Chọn Future Voucher</DialogTitle>

                <DialogContent dividers>
                    <RadioGroup
                        value={selectedVoucher}
                        onChange={(e) => setSelectedVoucher(e.target.value)}
                    >
                        {/* {vouchers && vouchers.data && (vouchers.data as any).map((voucher: any) => (
                            <Stack
                                direction='row'
                                alignItems='center'
                                justifyContent='space-between'
                                key={voucher._id}
                                sx={{
                                    mb: 2, p: 1, border: (theme) => `solid 1px ${theme.palette.divider}`,
                                    borderRadius: 2, bgcolor: (theme) => theme.customShadows.card
                                }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: (theme) => theme.palette.info.main,
                                        color: 'white',
                                        width: 100,
                                        height: 100,
                                        borderRadius: 1,
                                        alignContent: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    FL Voucher
                                </Box>

                                <Box sx={{ flexGrow: 1, px: 2 }}>
                                    <Typography>Giảm {voucher.discountType === 'percentage' ? `${voucher.discountValue}%` : `${fCurrencyVND(voucher.discountValue!)}`}</Typography>
                                    <Typography variant='body2' color='text.secondary'>
                                        Đơn tối thiểu {voucher.minOrderValue}
                                    </Typography>
                                    <Typography variant='caption' color='text.disabled'>
                                        Lượt dùng: {voucher.usageLimit}, HSD: {fUnixToDate(voucher.endDate!)}
                                    </Typography>
                                </Box>

                                <FormControlLabel value={voucher.voucherCode} control={<Radio />} label='' />
                            </Stack>
                        ))} */}
                    </RadioGroup>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDialog} color='error' variant='contained'>
                        Hủy
                    </Button>
                    <Button color='info' variant='contained' onClick={handleApplyVoucher}>
                        Áp dụng
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}