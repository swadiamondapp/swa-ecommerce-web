"use client";
import { useEffect, useState } from "react";

export default function VlogPage() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/api/vlog-proxy")
      .then((res) => res.text())
      .then((data) => setHtml(data))
      .catch((err) => console.error(err));
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
