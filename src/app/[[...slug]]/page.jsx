import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ["fa", "questions"] },
  ];
}

export default function Page({ params }) {
  return <ClientOnly />;
}