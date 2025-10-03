import { ICartItem } from "@/@types/cart";
import { IncrementerButton } from "@/components/custom-input";
import Iconify from "@/components/iconify";
import Image from "@/components/image";
import Label from "@/components/label";
import { slugify } from "@/utils/common";
import { fCurrencyVND } from "@/utils/formatNumber";
import { Box, Checkbox, IconButton, Stack, TableCell, TableRow, Typography } from "@mui/material";
import NextLink from "next/link";

type Props = {
    row: ICartItem
    selected: boolean
    onSelectRow: VoidFunction
    onDelete: VoidFunction
    onDecrease: VoidFunction
    onIncrease: VoidFunction
}

export default function CheckoutCartProduct({ row, selected, onSelectRow, onDelete, onDecrease, onIncrease }: Props) {
    return (
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox checked={selected} onClick={onSelectRow} />
            </TableCell>
            
            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    alt="product image"
                    src={row.product.images![0] || './assets/image-not-found.jpg'}
                    sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
                />

                <Stack spacing={0.5}>
                    <Typography
                        noWrap variant="subtitle1" color={"text.secondary"}
                        sx={{ maxWidth: 400 }} component={NextLink}
                        href={`./product/${slugify(row.product.name!)}-${row.product._id}`}
                    >
                        {row.product.name}
                    </Typography>

                    <Stack
                        direction="row"
                        alignItems="center"
                        sx={{ typography: 'body2', color: 'text.secondary' }}
                    >
                        <Stack alignItems='center' direction='row'>
                            <Typography>Phân loại: </Typography>
                            {Object.entries(row.variation.attributeValues).map((attribute, i) => (
                                <Label color='secondary' variant='soft' sx={{ ml: 0.5 }} key={i}>
                                    {attribute[1]}
                                </Label>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </TableCell>

            <TableCell>{fCurrencyVND(row.variation.price)}</TableCell>

            <TableCell>
                <Box sx={{ width: 96, textAlign: 'right' }}>
                    <IncrementerButton
                        quantity={row.quantity}
                        onDecrease={onDecrease}
                        onIncrease={onIncrease}
                        disabledDecrease={row.quantity <= 1}
                        disabledIncrease={row.quantity >= row.variation.stock}
                    />
                </Box>
            </TableCell>

            <TableCell align="right">{fCurrencyVND(row.subTotal)}</TableCell>

            <TableCell align="right">
                <IconButton onClick={onDelete}>
                    <Iconify icon="eva:trash-2-outline" color='red' />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}