import { Form, Formik } from "formik";
import { X } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createLead } from "../../../redux/leads/leadsThunk";
import { createLeadSchema } from "./schema";

interface Props {
  open: boolean;
  onClose: () => void;
}

const initialValues = {
  name: "",
  email: "",
  phone: "",
};

export default function CreateLeadModal({ open, onClose }: Props) {
  const dispatch = useAppDispatch();

  const creating = useAppSelector((state) => state.leads.creating);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-lg font-semibold">Create Lead</h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a new lead to your pipeline.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={createLeadSchema}
          onSubmit={async (values, { resetForm }) => {
            const result = await dispatch(createLead(values));

            if (createLead.fulfilled.match(result)) {
              resetForm();
              onClose();
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="space-y-4 p-5">
              <Field
                label="Name"
                name="name"
                placeholder="John Doe"
                value={values.name}
                error={touched.name ? errors.name : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={values.email}
                error={touched.email ? errors.email : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Field
                label="Phone"
                name="phone"
                placeholder="+91 9876543210"
                value={values.phone}
                error={touched.phone ? errors.phone : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  {creating ? "Creating..." : "Create Lead"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}

function Field({ label, error, ...props }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        {...props}
        id={props.name}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-slate-900/10 ${
          error ? "border-red-400" : "border-slate-300 focus:border-slate-500"
        }`}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
