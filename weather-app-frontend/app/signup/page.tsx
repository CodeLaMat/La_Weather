// app/signup/page.tsx
"use client"; // Add this line at the top

import React, { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import { registerUser } from "@/thunks/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSignUp}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
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
            type="text"
            className="w-full"
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
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
