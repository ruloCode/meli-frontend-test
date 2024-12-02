"use client";
import Text from "@/components/atoms/text/Text";
import Onboarding from "@/components/molecules/onboarding/Onboarding";
import MaxWidthMarginTemplate from "@/components/templates/maxWidthMarginTemplate/MaxWidthMarginTemplate";
import { useEffect, useState } from "react";

export default function Home({ searchParams }) {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem("firstVisit");

    if (!firstVisit) {
      setIsFirstVisit(true);
      localStorage.setItem("firstVisit", "true");
    }
  }, []);

  return (
    <MaxWidthMarginTemplate>
      {isFirstVisit && (
        <Onboarding />
      )}
    </MaxWidthMarginTemplate>
  );
}
