"use client";

import * as React from "react";
import { useAsset } from "@/lib/useAsset";

export default function Asset({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { asset } = useAsset(id);

  return <h1>Hello {`${asset}`}!</h1>;
}
