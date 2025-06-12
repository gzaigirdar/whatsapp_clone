import * as Yup from "yup";

export const signupSchema = Yup.object({
    name: Yup.string().required("please enter your full name"),
})
