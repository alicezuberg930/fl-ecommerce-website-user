// @mui
import { Link, Button, Divider, Typography, Stack, DialogProps } from '@mui/material';
// components
import Iconify from '@/components/iconify';
import { DialogAnimate } from '@/components/animate';
// assets
import { OrderCompleteIllustration } from '@/assets/illustrations';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  onReset: VoidFunction;
  onDownloadPDF: VoidFunction;
}

export default function CheckoutOrderComplete({ open, onReset, onDownloadPDF }: Props) {
  return (
    <DialogAnimate
      fullScreen
      open={open}
      slotProps={{
        paper: {
          sx: {
            maxWidth: { md: 'calc(100% - 48px)' },
            maxHeight: { md: 'calc(100% - 48px)' },
          }
        }
      }}
    >
      <Stack
        spacing={5}
        sx={{
          m: 'auto',
          maxWidth: 480,
          textAlign: 'center',
          px: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h4">Cảm ơn bạn vì đã mua hàng!</Typography>

        <OrderCompleteIllustration sx={{ height: 260 }} />

        <Typography>
          Mã đơn hàng
          <br />
          <br />
          <Link>01dc1370-3df6-11eb-b378-0242ac130002</Link>
          <br />
          <br />
          Chúng tôi sẽ gửi bạn thông báo khi đơn hàng bắt đầu được giao.
          <br /> Nếu bạn có thắc mắc nào thì hãy liên lạc với chúng tôi. <br /> <br />
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack
          spacing={2}
          justifyContent="space-between"
          direction={{ xs: 'column-reverse', sm: 'row' }}
        >
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            onClick={onReset}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Tiếp tục mua sắm
          </Button>

          <Button
            fullWidth
            size="large"
            variant="contained"
            startIcon={<Iconify icon="ant-design:file-pdf-filled" />}
            onClick={onDownloadPDF}
          >
            Tải PDF
          </Button>
        </Stack>
      </Stack>
    </DialogAnimate>
  );
}
