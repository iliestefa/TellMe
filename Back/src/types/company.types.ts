export interface Company {
  id: number;
  name: string;
  whatsapp_phone_id: string;
  access_token: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCompanyDTO {
  name: string;
  whatsapp_phone_id: string;
  access_token: string;
}

export interface UpdateCompanyDTO {
  name?: string;
  whatsapp_phone_id?: string;
  access_token?: string;
}



