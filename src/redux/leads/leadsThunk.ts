import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import type {
  CreateLeadPayload,
  Lead,
  LeadResponse,
  LeadsResponse,
  LeadStatus,
} from "./leadsTypes";

export const fetchLeads = createAsyncThunk<
  Lead[],
  string | undefined,
  { rejectValue: string }
>("leads/fetchLeads", async (search, { rejectWithValue }) => {
  try {
    const response = await api.get<LeadsResponse>("/leads", {
      params: search ? { search } : {},
    });

    return response.data.data;
  } catch {
    return rejectWithValue("Failed to fetch leads");
  }
});

export const createLead = createAsyncThunk<
  Lead,
  CreateLeadPayload,
  { rejectValue: string }
>("leads/createLead", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post<LeadResponse>("/leads", data);

    return response.data.data;
  } catch {
    return rejectWithValue("Failed to create lead");
  }
});

export const updateLeadStatus = createAsyncThunk<
  Lead,
  { id: number; status: LeadStatus },
  { rejectValue: string }
>("leads/updateStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await api.patch<LeadResponse>(`/leads/${id}/status`, {
      status,
    });

    return response.data.data;
  } catch {
    return rejectWithValue("Failed to update lead status");
  }
});
