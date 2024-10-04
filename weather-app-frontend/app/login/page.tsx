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
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Invalid Credentials!");
    } else {
      setIsLoading(false);
      router.replace("/");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", { callbackUrl: "/" });
    if (result?.error) {
      toast.error("Google sign-in failed!");
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-md rounded-lg bg-white dark:bg-gray-800">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-xl text-gray-800 dark:text-gray-100">
            Login to LaWeather
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-1 text-sm text-gray-600 dark:text-gray-300"
              >
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
              <label
                htmlFor="password"
                className="block mb-1 text-sm text-gray-600 dark:text-gray-300"
              >
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
                <Eye
                  className="absolute right-3 top-8 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <EyeOff
                  className="absolute right-3 top-8 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Button
                className="rounded-3xl bg-blue-500 hover:bg-blue-600 text-white"
                type="submit"
              >
                Sign In
              </Button>

              <Button
                className="rounded-3xl flex items-center justify-center bg-white dark:bg-gray-700 text-black dark:text-white"
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
