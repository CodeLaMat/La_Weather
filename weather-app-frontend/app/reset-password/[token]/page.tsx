"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetPassword } from "@/thunks/auth";
import { toast } from "sonner";
import Loading from "@/components/Loading";

export default function ResetPassword() {
  const { token } = useParams() as { token: string };
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoading = useAppSelector(
    (state) => state.loading.isResettingPassword
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const resultAction = await dispatch(resetPassword({ token, password }));
      if (resetPassword.fulfilled.match(resultAction)) {
        toast.success("Password has been reset successfully.");
        router.push("/login");
      } else {
        throw new Error(resultAction.payload as string);
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-darkBackground dark:bg-lightBackground p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-darkText dark:text-lightText">
          Set New Password
        </h2>
        <div className="mb-4 text-darkText dark:text-lightText">
          <label
            htmlFor="password"
            className="block mb-1 text-sm text-gray-600 dark:text-gray-300"
          >
            New Password
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
        <div className="mb-4 text-darkText dark:text-lightText">
          <label
            htmlFor="confirmPassword"
            className="block mb-1 text-sm text-gray-600 dark:text-gray-300"
          >
            Confirm New Password
          </label>
          <Input
            required
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white rounded-3xl"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}
