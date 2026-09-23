import { createSlice } from "@reduxjs/toolkit";
import type { Lead } from "./leadsTypes";
import { createLead, fetchLeads, updateLeadStatus } from "./leadsThunk";
import toast from "react-hot-toast";

interface LeadState {
  leads: Lead[];
  loading: boolean;
  creating: boolean;
  error: string | null;
}

const initialState: LeadState = {
  leads: [],
  loading: false,
  creating: false,
  error: null,
};

const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })

      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      .addCase(createLead.pending, (state) => {
        state.creating = true;
        state.error = null;
      })

      .addCase(createLead.fulfilled, (state, action) => {
        state.creating = false;
        state.leads.unshift(action.payload);
        toast.success("Leads Successfully Created!");
      })

      .addCase(createLead.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload ?? "Something went wrong";
      })

      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        const index = state.leads.findIndex(
          (lead) => lead.id === action.payload.id,
        );

        if (index !== -1) {
          state.leads[index] = action.payload;
          toast.success("Leads Successfully Updated!");
        }
      });
  },
});

export const { clearError } = leadSlice.actions;

export default leadSlice.reducer;
