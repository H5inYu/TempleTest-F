// donation.ts
export interface Donation {
  fDonationId: number;
  fAmount: number;
  fDonationDate: string;
  fUserId: number;      // 新增這行來儲存會員 ID
}
