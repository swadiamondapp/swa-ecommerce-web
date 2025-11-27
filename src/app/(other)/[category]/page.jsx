"use client";
import CategoryPageClient from "./CategoryPageClient";

export default function Page({ params }) {
  return <CategoryPageClient category={params.category} />;
}
