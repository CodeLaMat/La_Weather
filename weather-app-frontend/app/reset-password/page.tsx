"use client";

import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { requestPasswordReset } from "../../thunks/auth";
import { toast } from "sonner";
import Loading from "../../components/Loading";

export default function RequestPasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    (state) => state.loading.isRequestingPasswordReset
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    try {
      const resultAction = await dispatch(requestPasswordReset({ email }));
      if (requestPasswordReset.fulfilled.match(resultAction)) {
        const successMessage =
          resultAction.payload?.message ||
          "If an account with that email exists, a reset link has been sent.";
        toast.success(successMessage);
        setMessage(successMessage);
        setEmail("");
      } else {
        const errorMessage =
          typeof resultAction.payload === "string"
            ? resultAction.payload
            : "Request failed.";
        toast.error(String(errorMessage));
        setMessage(errorMessage);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(errorMessage);
      setMessage(errorMessage);
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
          Reset Your Password
        </h2>
        <div className="mb-4 text-darkText dark:text-lightText">
          <label
            htmlFor="email"
            className="block mb-1 text-sm text-gray-600 dark:text-gray-300"
          >
            Enter your registered email address
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
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-3xl"
        >
          Send Reset Link
        </Button>
        {message && (
          <p className="text-center mt-4 text-sm text-red-600 dark:text-red-300">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
