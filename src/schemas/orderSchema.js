import * as Yup from "yup";

export const orderSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone_number: Yup.string()
    .matches(/^[0-9]+$/, "Phone must be numbers only")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  payment_method: Yup.string().required("Select a payment method"),
});
