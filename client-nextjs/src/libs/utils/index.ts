/**
 * Utils class containing utility methods.
 */
export class Utils {
  /**
   * Format the given number as currency in Indonesian Rupiah (IDR).
   * @param amount The number to format as currency.
   * @returns A string representing the formatted currency in IDR.
   */
  static formatCurrency(amount: number): string {
    try {
      // Use Intl.NumberFormat to format the currency as IDR
      const formattedCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
      }).format(amount)

      // Remove the currency symbol provided by Intl.NumberFormat and add "IDR" manually
      const formattedCurrencyIDR = formattedCurrency.replace('Rp', 'IDR')

      return formattedCurrencyIDR
    } catch (error) {
      return '' // Return an empty string if formatting fails
    }
  }
}
