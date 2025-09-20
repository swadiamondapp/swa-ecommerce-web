"use client";

import { FadeLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FadeLoader color="#00464d" />
    </div>
  );
}
