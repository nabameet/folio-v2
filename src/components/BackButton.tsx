"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BackButton({ fallbackUrl = "/" }) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const checkCanGoBack = () => {
      // Check if there's browser history
      const hasHistory = window.history.length > 1;

      // Check if referrer is from same domain
      const referrer = document.referrer;
      const currentHost = window.location.hostname;

      let isInternalReferrer = false;
      if (referrer) {
        try {
          const referrerHost = new URL(referrer).hostname;
          isInternalReferrer = referrerHost === currentHost;
        } catch {
          // Invalid referrer URL
          isInternalReferrer = false;
        }
      }

      // Can go back only if has history AND referrer is internal
      setCanGoBack(hasHistory && isInternalReferrer);
    };

    checkCanGoBack();
  }, []);

  const handleBack = () => {
    if (canGoBack) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  const currentPath = usePathname();

  return (
    <button
      type="button"
      onClick={handleBack}
      className={
        currentPath === "/" || currentPath === "/play" ? "invisible" : "visible"
      }
    >
      back
    </button>
  );
}
