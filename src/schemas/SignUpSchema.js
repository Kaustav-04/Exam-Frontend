import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  type: Yup.string().required("User Type is required"),
  name: Yup.string().required("Name is required"),
  phone_number: Yup.string().required("Phone Number Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ).required("Required")
});
