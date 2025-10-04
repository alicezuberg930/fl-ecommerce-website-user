// @mui
import { Table, TableBody, TableContainer } from '@mui/material'
// @types
import { ICartItem } from '@/@types/cart'
// components
import { TableHeadCustom } from '@/components/table'
//
import CheckoutCartProduct from './CheckoutCartProduct'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'product', label: 'Sản phẩm' },
    { id: 'price', label: 'Giá' },
    { id: 'quantity', label: 'SL' },
    { id: 'totalPrice', label: 'Giá tổng', align: 'right' },
    { id: '' },
]

// ----------------------------------------------------------------------

type Props = {
    products: ICartItem[]
    onDelete: (id: string) => void
    onDecreaseQuantity: (id: string) => void
    onIncreaseQuantity: (id: string) => void
    selected: string[]
    onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void
    onSelectRow: (id: string) => void
}

export default function CheckoutCartProductList({
    products,
    onDelete,
    onIncreaseQuantity,
    onDecreaseQuantity,
    selected,
    onSelectAllRows,
    onSelectRow
}: Props) {
    return (
        <TableContainer sx={{ boxShadow: (theme) => theme.shadows[4], borderRadius: 2 }} >
            <Table sx={{ minWidth: 720 }}>
                <TableHeadCustom
                    headLabel={TABLE_HEAD}
                    rowCount={products.length}
                    numSelected={selected.length}
                    onSelectAllRows={(checked) =>
                        onSelectAllRows(
                            checked,
                            products.map((row) => row._id)
                        )
                    }
                />

                <TableBody>
                    {products.map((row) => (
                        <CheckoutCartProduct
                            key={row._id}
                            row={row}
                            selected={selected.includes(row._id)}
                            onSelectRow={() => onSelectRow(row._id)}
                            onDelete={() => onDelete(row._id)}
                            onDecrease={() => onDecreaseQuantity(row._id)}
                            onIncrease={() => onIncreaseQuantity(row._id)}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
