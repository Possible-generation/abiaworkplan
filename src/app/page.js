"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/register");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32  flex items-center justify-center">
        <Image
          src="/applogo.png"
          alt="Logo"
          width={150}
          height={150}
          className="m-2"
        />
      </div>
    </div>
  );
}
