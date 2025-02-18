import { z } from "zod";

export const SignInSchema = z.object({
  username: z.string().min(2, {
    message: "Please enter a valid username.",
  }),
  password: z.string().min(2, {
    message: "Please enter a valid password.",
  }),
});

export const SignUpSchema = z.object({
  password: z.string().min(8, {
    message: "Please enter a minimum 8 characters or numbers.",
  }),
  username: z.string().min(3, {
    message: "Please enter a valid Username.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  name: z.string().min(3, {
    message: "Please enter a minimum 3 characters.",
  }),
});

export const QuizBasicSchema = z.object({
  title: z.string().min(3, {
    message: "Please enter a valid quiz name. >= 3 characters",
  }),
  description: z.string().min(3, {
    message: "Please enter a valid descriptions. >= 3 characters",
  }),
});
