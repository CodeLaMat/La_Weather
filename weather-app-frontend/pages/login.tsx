"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const eyeIconProps = {
    className: "absolute z-10 right-3 top-8 cursor-pointer",
    alt: "Show or hide password",
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid Credentials!");
    } else {
      router.replace("/dashboard");
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", { callbackUrl: "/dashboard" });
    if (result?.error) {
      toast.error("Google sign-in failed!");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="flex justify-center items-center h-80%">
      <Card
        id="login-form"
        className="shadow-lg w-full max-w-md p-11 rounded-3xl bg-[hsla(var(--card-glassy))] mx-4"
      >
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-xl">Login to Taitovarasto</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-sm">
                Email
              </label>
              <Input
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                autoComplete="email"
                className="w-full"
              />
            </div>

            <div className="relative mb-4">
              <label htmlFor="password" className="block mb-1 text-sm">
                Password
              </label>
              <Input
                required
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                className="w-full"
              />
              {!showPassword ? (
                <Eye {...eyeIconProps} onClick={() => setShowPassword(true)} />
              ) : (
                <EyeOff
                  {...eyeIconProps}
                  onClick={() => setShowPassword(false)}
                />
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Button
                variant={"default"}
                className="rounded-3xl bg-blue-500 hover:bg-blue-600"
                type="submit"
              >
                Sign In
              </Button>

              <Button
                variant={"outline"}
                className="rounded-3xl flex items-center justify-center bg-white text-black"
                onClick={handleGoogleSignIn}
              >
                <AiFillGoogleCircle className="mr-2 text-xl" />
                Sign in with Google
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 justify-between w-full items-end">
          <div className="flex flex-row justify-between w-full">
            <a
              href="/reset-password"
              className="text-sm text-blue-500 underline hover:text-blue-600"
            >
              Forgot your password?
            </a>
            <a
              href="/signup"
              className="text-sm text-blue-500 underline hover:text-blue-600"
            >
              Sign Up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
