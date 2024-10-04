"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loading from "./Loading";

const GlobalLoading: React.FC = () => {
  const loadingState = useSelector((state: RootState) => state.loading);
  const isLoading = Object.values(loadingState).some((loading) => loading);

  if (!isLoading) return null;

  return <Loading />;
};

export default GlobalLoading;
