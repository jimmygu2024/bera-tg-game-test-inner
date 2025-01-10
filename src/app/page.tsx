'use client';

import { useLoad } from "@/hooks/use-load";

export default function Home() {
  useLoad();

  return (
    <div className="">Hello world</div>
  );
}
