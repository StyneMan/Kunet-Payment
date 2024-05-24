/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axios";

class APIService {
  static validate = (voucherCode: string, amount: number) =>
    axiosInstance.post(`/vouchers/code/validate?voucher_code=${voucherCode}&amount=${amount}`, {}).then((res) => res);

  static generateOTP = (voucherCode: string) =>
    axiosInstance.get(`/vouchers/otp/generate/${voucherCode}`).then((res) => res);

  static getPaymentInfo = (transactionId: string) =>
    axiosInstance.get(`/vouchers/redeem-link/info/${transactionId}`).then((res) => res);

  static redeem = (payload: any) =>
    axiosInstance.post(`/vouchers/redeem`, payload, ).then((res) => res);
}

export default APIService;
