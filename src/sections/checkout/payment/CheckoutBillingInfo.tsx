// @mui
import { Card, Button, Typography, CardHeader, CardContent } from '@mui/material';
// @types
import { ICheckoutBillingAddress } from '@/@types/product';
// components
import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  billing: ICheckoutBillingAddress | null;
  onBackStep: VoidFunction;
};

export default function CheckoutBillingInfo({ billing, onBackStep }: Props) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Địa chỉ nhận hàng"
        action={
          <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />} onClick={onBackStep}>
            Edit
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {billing?.contactName}&nbsp;
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            ({billing?.addressType})
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
          {billing?.street} {billing?.ward} {billing?.district} {billing?.province}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {billing?.contactPhone}
        </Typography>
      </CardContent>
    </Card>
  );
}
