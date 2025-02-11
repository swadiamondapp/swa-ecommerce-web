import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [
    { slug: ["fa", "questions"] },
  ];
}

export default function Page({ params }) {
  return <ClientOnly />;
}