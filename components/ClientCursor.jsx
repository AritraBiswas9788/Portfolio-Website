"use client";
import { useEffect, useState } from "react";
import CustomCursor from "../components/CustomCursor.jsx";

export default function ClientOnlyCursor() {
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      !window.matchMedia("(pointer: coarse)").matches
    ) {
      setShowCursor(true);
    }
  }, []);

  if (!showCursor) return null;
  return <CustomCursor />;
}
