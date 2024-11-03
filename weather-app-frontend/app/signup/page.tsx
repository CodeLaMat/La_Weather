"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerUser } from "../../thunks/auth";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { startLoading, stopLoading } from "../../slices/loadingSlice";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoading = useAppSelector((state) => state.loading.isLoggingIn);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSignUp called");
    try {
      const resultAction = await dispatch(
        registerUser({ name, surname, email, password })
      );
      console.log(resultAction);
      if (registerUser.fulfilled.match(resultAction)) {
        toast.success("User registered successfully");
        router.push("/login");
      } else {
        throw new Error(resultAction.payload as string);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
    }
  };

  const handleGoogleSignUp = async () => {
    dispatch(startLoading("isLoggingIn"));
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Google Sign-In failed:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      dispatch(stopLoading("isLoggingIn"));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-black">
      <form
        onSubmit={handleSignUp}
        className="bg-darkBackground dark:bg-lightBackground p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4text-darkText dark:text-lightText">
          Sign Up to LaWeather
        </h2>
        {/* Name Field */}
        <div className="mb-4 text-darkText dark:text-lightText">
          <label
            htmlFor="name"
            className="block mb-1 text-sm text-darkText dark:text-lightText"
          >
            Name
          </label>
          <Input
            required
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-full"
            placeholder="John"
          />
        </div>

        {/* Surname Field */}
        <div className="mb-4 text-darkText dark:text-lightText">
          <label
            htmlFor="surname"
            className="block mb-1 text-sm text-darkText dark:text-lightText"
          >
            Surname
          </label>
          <Input
            required
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            className="w-full"
            placeholder="Doe"
          />
        </div>
        <div className="mb-4 text-darkText dark:text-lightText">
          <label
            htmlFor="email"
            className="block mb-1 text-sm text-darkText dark:text-lightText"
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

        <div className="mb-4  relative text-darkText dark:text-lightText">
          <label
            htmlFor="password"
            className="block mb-1 text-sm text-darkText dark:text-lightText"
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
            placeholder="*********"
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

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-lightText rounded-3xl"
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
              <span className="px-2 bg-darkBackground dark:bg-lightBackground text-darkText dark:text-lightText ">
                OR
              </span>
            </div>
          </div>
          <div className="mt-4">
            <Button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-lightText rounded-3xl"
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
