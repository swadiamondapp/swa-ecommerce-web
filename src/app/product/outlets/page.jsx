"use client";
import React from "react";
import Outlet from "./outlet";
import Feature from "@/components/features/features";
function page() {
  return (
    <>
      <Outlet />
      <Feature />
    </>
  );
}

export default page;
