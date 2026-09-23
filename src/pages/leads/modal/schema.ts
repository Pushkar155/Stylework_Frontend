import * as Yup from "yup";

export const createLeadSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .required("Name is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),

  phone: Yup.string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .required("Phone number is required"),
});
