"use client";

import { Suspense } from "react";
import Homepage from "./homepage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Homepage></Homepage>
    </Suspense>
  );
}
