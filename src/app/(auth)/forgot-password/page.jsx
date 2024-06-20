"use client";
import ForgotPasswordImage from "@/assets/images/forgot_password.png";
import Logo from "@/assets/images/logo.svg";
import AuthLayout from "@/components/auth-layout";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ArrowBack } from "@/assets/icons/arrow-back";

export default function ForgotPassword() {
  const router = useRouter();
  const loginSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (value) => {
    console.log("value", value);
    router.push("/login");
  };

  return (
    <main>
      <AuthLayout image={ForgotPasswordImage.src}>
        <div className="w-full">
          <img src={Logo.src} alt="logo" className="w-20" />
          <h5 className="font-medium mt-4 text-lg">Forgot Password? 🔒</h5>
          <p className="mb-5">
            Enter your email and we will send you instructions to reset your
            password
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  key="email"
                  name="email"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label>Email</Label>
                        <FormControl>
                          <Input
                            type="text"
                            className="font-semibold"
                            placeholder="Enter Your Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <Button className="w-full" type="submit">
                  Send Reset Link
                </Button>
              </div>
            </form>
          </Form>

          <Link
            href={"/login"}
            className="flex justify-center items-center mt-4"
          >
            <ArrowBack className="w-6 h-6" /> Back to login
          </Link>
        </div>
      </AuthLayout>
    </main>
  );
}
