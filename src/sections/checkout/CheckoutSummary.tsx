'use client'
// @mui
import {
    Box,
    Card,
    Stack,
    Button,
    Divider,
    TextField,
    CardHeader,
    Typography,
    CardContent,
    InputAdornment,
} from '@mui/material';
// utils
import { fCurrency, fCurrencyVND } from '@/utils/formatNumber';
// components
import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

type Props = {
    total: number;
    discount?: number;
    subtotal: number;
    shipping?: number;
    onEdit?: VoidFunction;
    enableEdit?: boolean;
    onApplyDiscount?: (discount: number) => void;
    enableDiscount?: boolean;
};

export default function CheckoutSummary({
    total,
    onEdit,
    discount,
    subtotal,
    shipping,
    onApplyDiscount,
    enableEdit = false,
    enableDiscount = false,
}: Props) {
    const displayShipping = shipping !== null ? 'Free' : '-';

    return (
        <Card sx={{ mb: 3 }}>
            <CardHeader
                title="Tóm tắt đơn hàng"
                action={
                    enableEdit && (
                        <Button size="small" onClick={onEdit} startIcon={<Iconify icon="eva:edit-fill" />}>
                            Edit
                        </Button>
                    )
                }
            />

            <CardContent>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Sub Tổng
                        </Typography>
                        <Typography variant="subtitle2">{fCurrencyVND(subtotal)}</Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Khuyến mãi
                        </Typography>
                        <Typography variant="subtitle2">{discount ? fCurrencyVND(-discount) : '-'}</Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Vận chuyển
                        </Typography>
                        <Typography variant="subtitle2">
                            {shipping ? fCurrency(shipping) : displayShipping}
                        </Typography>
                    </Stack>

                    <Divider />

                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="subtitle1">Tổng</Typography>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                                {fCurrencyVND(total)}
                            </Typography>
                            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                                (VAT nếu có)
                            </Typography>
                        </Box>
                    </Stack>

                    {enableDiscount && onApplyDiscount && (
                        <TextField
                            fullWidth
                            placeholder="Mã giảm giá"
                            value=""
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button onClick={() => onApplyDiscount(5)} sx={{ mr: -0.5 }}>
                                                Apply
                                            </Button>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}
