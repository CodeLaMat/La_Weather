"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser } from "@/thunks/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { startLoading, stopLoading } from "@/slices/loadingSlice";
import { FcGoogle } from "react-icons/fc";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoading = useAppSelector((state) => state.loading.isLoggingIn);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(startLoading("isLoggingIn"));
    try {
      const resultAction = await dispatch(registerUser({ email, password }));
      console.log(resultAction);
      if (registerUser.fulfilled.match(resultAction)) {
        toast.success("User registered successfully");
        router.push("/login");
      } else {
        throw new Error(resultAction.payload as string);
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      dispatch(stopLoading("isLoggingIn"));
    }
  };

  const handleGoogleSignUp = async () => {
    dispatch(startLoading("isLoggingIn"));
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error: any) {
      console.error("Google Sign-In failed:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      dispatch(stopLoading("isLoggingIn"));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSignUp}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
          Sign Up
        </h2>
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
            className="w-full"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
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
            type="password"
            className="w-full"
            placeholder="••••••••"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                OR
              </span>
            </div>
          </div>
          <div className="mt-4">
            <Button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-3xl"
              disabled={isLoading}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              {isLoading ? "Processing..." : "Sign Up with Google"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
