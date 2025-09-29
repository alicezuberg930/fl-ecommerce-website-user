import { CartItem } from "@/@types/cart";
import { slugify } from "@/app/common/utils";
import Iconify from "@/components/iconify";
import Image from "@/components/image";
import { fCurrencyVND } from "@/utils/formatNumber";
import { Box, Checkbox, Grid, IconButton, Link, Stack, TextField, Tooltip, Typography } from "@mui/material";
import NextLink from "next/link";

type Props = {
    quantities: Map<string, number>,
    item: CartItem,
    handleDecreaseQuantity: (id: string) => void,
    handleIncreaseQuantity: (id: string) => void,
    handleRemoveItem: (id: string) => void
}

export default function CartProductItem({ quantities, item, handleDecreaseQuantity, handleIncreaseQuantity, handleRemoveItem }: Props) {
    const { productId, name, price } = item

    let productURL = `./product/${slugify(name!)}-${productId}`
    return (
        <Box key={productId} sx={{ boxShadow: (theme) => theme.customShadows.card, p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems='center'>
                <Grid size={{ xs: 12, md: 12, lg: 2 }}>
                    <Stack direction='row' alignItems='center'>
                        <Checkbox
                        // checked={rowCount > 0 && numSelected === rowCount}
                        // onChange={(event: ChangeEvent<HTMLInputElement>) => { }}
                        />
                        <Image src='./assets/image-not-found.jpg' sx={{ width: 80, height: 80 }} />
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 7 }}>
                    <Stack justifyContent='space-between' direction='row' alignItems='center'>
                        <Stack direction='column' flex={1}>
                            <Link component={NextLink} href={productURL} color='textSecondary'>
                                {name ?? 'Sản phẩm không tồn tại'}
                            </Link>
                            <Link component={NextLink} href={productURL} color='textSecondary'>
                                Phân loại: Màu đen
                            </Link>
                        </Stack>
                        <Box>
                            <Typography variant='h6'>{fCurrencyVND(price ?? 0)}</Typography>
                        </Box>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 12, lg: 3 }}>
                    <Stack spacing={2} direction='row' alignItems='center' justifyContent='flex-end'>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: 1,
                                overflow: 'hidden',
                                '& .MuiButtonBase-root': {
                                    bgcolor: '#1E50A2',
                                    color: 'white',
                                    borderRadius: 0,
                                    '&:hover': { bgcolor: '#163D7A' },
                                },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 0,
                                    width: 50,
                                    input: { textAlign: 'center', padding: '8px 0' },
                                },
                            }}
                        >
                            <IconButton onClick={() => handleDecreaseQuantity(productId!)}>
                                <Iconify icon='ri:subtract-fill' />
                            </IconButton>
                            <TextField
                                value={quantities.get(item.productId!) || 1}
                                slotProps={{ input: { readOnly: true } }}
                            />
                            <IconButton onClick={() => handleIncreaseQuantity(productId!)}>
                                <Iconify icon='eva:plus-fill' />
                            </IconButton>
                        </Box>
                        <Tooltip title='Xóa'>
                            <IconButton color='default' size='medium' onClick={() => handleRemoveItem(productId!)}>
                                <Iconify icon='eva:trash-outline' />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}