"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

export function AdblockDetector() {
  const [adblockDetected, setAdblockDetected] = useState(false);

  useEffect(() => {
    // This is a common technique to detect adblockers.
    // We create a bait script and check if it's blocked.
    const bait = document.createElement("div");
    bait.innerHTML = "&nbsp;";
    bait.className = "adsbox"; // A common class name blocked by adblockers
    bait.style.position = "absolute";
    bait.style.left = "-9999px";
    document.body.appendChild(bait);

    // Use a timeout to check if the element was removed or hidden
    const checkAdblock = setTimeout(() => {
      if (
        bait.offsetHeight === 0 ||
        window.getComputedStyle(bait).display === "none"
      ) {
        setAdblockDetected(true);
      }
      document.body.removeChild(bait);
    }, 1000);

    return () => clearTimeout(checkAdblock);
  }, []);

  if (!adblockDetected) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[100] max-w-md">
       <Alert>
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Support Independent Journalism</AlertTitle>
          <AlertDescription>
            We noticed you're using an adblocker. Please consider supporting us by disabling it on our site.
          </AlertDescription>
        </Alert>
    </div>
  );
}
