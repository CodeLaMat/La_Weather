"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the AuthErrorPage component to prevent server-side rendering issues
const AuthErrorPage = dynamic(() => import("./AuthErrorPage"), { ssr: false });

export default function ErrorPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorPage />
    </Suspense>
  );
}
