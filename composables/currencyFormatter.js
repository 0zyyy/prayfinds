export const useCurrencyFormatter = (value)  => {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    })
    return formatter.format(value)
}

export const useDiscountFormatter = (value, discount) => {
    return useCurrencyFormatter(value - (value * discount / 100));
}
