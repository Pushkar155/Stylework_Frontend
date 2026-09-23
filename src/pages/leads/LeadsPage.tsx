import { useEffect, useState } from "react";
import { Plus, Search, Users } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CreateLeadModal from "./modal/CreateLeadModal";
import LeadTable from "./index";
import { fetchLeads } from "../../redux/leads/leadsThunk";

export default function LeadsPage() {
  const dispatch = useAppDispatch();

  const { leads, loading, error } = useAppSelector((state) => state.leads);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(fetchLeads(search || undefined));
    }, 300);

    return () => clearTimeout(timeout);
  }, [dispatch, search]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Users size={22} />

              <h1 className="text-2xl font-bold tracking-tight">
                Lead Tracker
              </h1>
            </div>

            <p className="text-sm text-slate-500">
              Manage and track your sales leads.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            <Plus size={17} />
            Create Lead
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4">
            <div className="relative max-w-sm">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email or phone..."
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-slate-500"
              />
            </div>
          </div>

          {error && (
            <div className="border-b border-red-100 bg-red-50 px-6 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center text-sm text-slate-500">
              Loading leads...
            </div>
          ) : (
            <LeadTable leads={leads} />
          )}
        </div>
      </div>

      <CreateLeadModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
