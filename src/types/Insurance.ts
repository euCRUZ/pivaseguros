export interface InsuranceRule {
  company: string;
  rules: {
    type: string;
    documentType: string;
  }[];
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  insuranceCompany: string;
  status: "success" | "error" | "pending";
  content?: string;
  file: File;
}

// export interface RealEstate {
//   qtd_boleto_porto: number
//   id: string;
//   name: string;
// }
