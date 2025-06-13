import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .required("Please enter your full name")
    .matches(/^[a-zA-Z_ ]*$/, "Invalid characters")
    .min(2, "Name must be at least 2 characters long")
    .max(16, "Name cannot be more than 16 characters long"),
  email: Yup.string().required("Please enter your email")   
  .email('invalid email'),
  status: Yup.string() 
  .max(64,'Max 64 characters'),
  password: Yup.string()
  .required("please enter your password")
  .matches(
    /^(?=(?:[^A-Za-z]*[A-Za-z]){4,})(?=.*\d)(?=(?:[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]){1,2}$)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
    "Password must have at least 4 letters, at least 1 digit, and 1-2 special characters"
  )

});
