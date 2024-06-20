"use client";
import LoginImage from "@/assets/images/3d_login_image.png";
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

export default function Login() {
  const router = useRouter();
  const loginSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (value) => {
    console.log("value", value);
    router.push("/dashboard");
  };

  return (
    <main>
      <AuthLayout image={LoginImage.src}>
        <div className="w-full">
          <img src={Logo.src} alt="logo" className="w-20" />
          <h5 className="font-medium mt-4 text-lg">Welcome to 7Span 👋🏻</h5>
          <p className="mb-5">
            Please sign-in to your account and start the adventure
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
                <FormField
                  key="password"
                  name="password"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label>Password</Label>
                        <FormControl>
                          <Input
                            type="password"
                            className="font-semibold"
                            placeholder="Enter Your Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
                  <Link href={"/forgot-password"} className="">
                    Forgot Password?
                  </Link>
                </div>
                <Button className="w-full" type="submit">
                  Login
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-center mt-5">
            New to our platform?{" "}
            <Link href={"/register"} className="text-primary-500">
              Create account
            </Link>
          </p>
        </div>
      </AuthLayout>
    </main>
  );
}
