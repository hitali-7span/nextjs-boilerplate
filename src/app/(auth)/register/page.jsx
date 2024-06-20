"use client";
import RegisterImage from "@/assets/images/register.png";
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

export default function Register() {
  const router = useRouter();
  const loginSchema = z.object({
    username: z.string().nonempty("username is required"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
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
      <AuthLayout image={RegisterImage.src}>
        <div className="w-full">
          <img src={Logo.src} alt="logo" className="w-20" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  key="username"
                  name="username"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Label>Username</Label>
                        <FormControl>
                          <Input
                            type="text"
                            className="font-semibold"
                            placeholder="Enter Your username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
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

                <div className="flex items-center gap-3">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept term & condition</Label>
                </div>
                <Button className="w-full" type="submit">
                  Register
                </Button>
              </div>
            </form>
          </Form>
          <p className="text-center mt-5">
            Already have an account?{" "}
            <Link href={"/login"} className="text-primary-500">
              Sign In
            </Link>
          </p>
        </div>
      </AuthLayout>
    </main>
  );
}
