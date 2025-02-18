import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./InputField";
import { SignUpSchema } from "@/lib/schemas";
import { useState } from "react";
import { toast } from "sonner";

const FormSchema = SignUpSchema;

function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Handle the submit event
    setIsLoading(true);
    setError(null);

    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (resp.status == 200) {
        console.log(await resp.text());
        toast.success("Signed up successfully! Now login to continue.");
        return navigate("/auth/sign-in");
      } else {
        const error = await resp.text();
        setError(error);
        setIsLoading(false);
        toast.error(error);
      }
    } catch (err) {
      setError("Unexpected error occurred. Try again later.");
      toast.error("Unexpected error occurred. Try again later.");
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {error && (
          <div className="w-full text-red-500" role="alert">
            Error: {error}
          </div>
        )}
        <InputField
          control={form.control}
          name="name"
          placeholder="Name"
          label="Name"
          disabled={isLoading}
        />
        <InputField
          control={form.control}
          name="username"
          placeholder="Username"
          label="Username"
          disabled={isLoading}
        />
        <InputField
          control={form.control}
          name="email"
          placeholder="Email"
          label="Email Address"
          disabled={isLoading}
        />
        <InputField
          control={form.control}
          name="password"
          placeholder="Password"
          label="Password"
          type="password"
          disabled={isLoading}
        />
        <Button isLoading={isLoading} type="submit" size="lg">
          Submit
        </Button>
      </form>
    </Form>
  );
}

function SignUp() {
  return (
    <div className="flex flex-col md:flex-row gap-8 gap-x-12 px-7 md:px-4 min-h-screen justify-center md:items-center max-w-5xl mx-auto">
      <div className="md:flex-1 text-left ">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Sign Up
          </h1>
        </div>
        <p className="text-secondary leading-7 [&:not(:first-child)]:mt-6">
          Create a new account to get started.
        </p>
        <p className="text-secondary leading-7 [&:not(:first-child)]:mt-6">
          Already a user?{" "}
          <Link to="/auth/sign-in" className="text-primary underline">
            Sign In
          </Link>
        </p>
      </div>
      <div className="w-full md:flex-[1] flex justify-center">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
