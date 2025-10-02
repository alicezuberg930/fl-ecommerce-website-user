import { ICartItem } from "@/@types/cart";
import { IncrementerButton } from "@/components/custom-input";
import Iconify from "@/components/iconify";
import Image from "@/components/image";
import Label from "@/components/label";
import { slugify } from "@/utils/common";
import { fCurrencyVND } from "@/utils/formatNumber";
import { Box, Checkbox, Grid, IconButton, Link, Stack, TextField, Tooltip, Typography } from "@mui/material";
import NextLink from "next/link";

type Props = {
    item: ICartItem,
    handleDecreaseQuantity: (id: string) => void,
    handleIncreaseQuantity: (id: string) => void,
    handleRemoveItem: (id: string) => void
}

export default function CartProductItem({ item, handleDecreaseQuantity, handleIncreaseQuantity, handleRemoveItem }: Props) {
    let productURL = `./product/${slugify(item.product.name!)}-${item.product._id}`
    const attributeValues = Object.entries(item.variation.attributeValues)
    return (
        <Box sx={{ boxShadow: (theme) => theme.customShadows.card, p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems='center'>
                <Grid size={{ xs: 12, md: 2, lg: 2 }}>
                    <Stack direction='row' alignItems='center'>
                        <Checkbox
                        // checked={rowCount > 0 && numSelected === rowCount}
                        // onChange={(event: ChangeEvent<HTMLInputElement>) => { }}
                        />
                        <Image src={`${item?.product?.images![0] || './assets/image-not-found.jpg'}`} sx={{ width: 80, height: 80 }} />
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                    <Stack justifyContent='space-between' direction='row' alignItems='center'>
                        <Stack direction='column' flex={1}>
                            <Link component={NextLink} href={productURL} color='textSecondary'>
                                {item.product.name || 'Sản phẩm không tồn tại'}
                            </Link>
                            <Stack alignItems='center' direction='row'>
                                <Typography variant='body2' color='textSecondary'>
                                    Phân loại:
                                </Typography>
                                {attributeValues.map((attribute, i) => (
                                    <Label color='secondary' variant='soft' sx={{ ml: 0.5 }} key={i}>
                                        {attribute[1]}
                                    </Label>
                                ))}
                            </Stack>
                        </Stack>
                        <Typography variant='h6'>{fCurrencyVND(item.variation.price)}</Typography>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                    <Stack spacing={2} direction='row' alignItems='center' justifyContent='flex-end'>
                        <IncrementerButton
                            quantity={item.quantity}
                            onDecrease={() => handleDecreaseQuantity(item._id)}
                            onIncrease={() => handleIncreaseQuantity(item._id)}
                            disabledDecrease={item.quantity == 1}
                            disabledIncrease={item.quantity == item.variation.stock}
                        />
                        <Typography noWrap variant='button'>
                            {fCurrencyVND(item.variation.price * item.quantity)}
                        </Typography>
                        <Tooltip title='Xóa'>
                            <IconButton color='default' size='medium' onClick={() => handleRemoveItem(item._id)}>
                                <Iconify icon='eva:trash-outline' color='red' />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}