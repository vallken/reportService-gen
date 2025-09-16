export interface FormData {
  to: string;
  address: string;
  phone: string;
  date: string;
  part: string;
  qty: string;
  problem: string;
  components: string;
  trial: string;
  supplier: string;
  customer: string;
  supplierSignature: string;
  customerSignature: string;
}

export interface SignatureData {
  supplier: string;
  customer: string;
}