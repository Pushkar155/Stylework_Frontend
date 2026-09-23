export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "CONVERTED"
  | "LOST";

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  createdAt: string;
}

export interface CreateLeadPayload {
  name: string;
  email: string;
  phone: string;
}

export interface LeadsResponse {
  success: boolean;
  data: Lead[];
}

export interface LeadResponse {
  success: boolean;
  data: Lead;
}
