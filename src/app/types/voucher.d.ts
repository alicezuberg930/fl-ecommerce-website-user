interface Voucher {
    _id?: string,
    voucherCode?: string,
    discountType?: string,
    discountValue?: number,
    applicableProducts?: number | Product,
    startDate?: number,
    endDate?: number,
    usageLimit?: number,
    salePeriods?: {
        Promotionname?: string,
        startTime?: string,
        endTime?: string
    }[],
    minOrderValue?: number,
    status?: string
}