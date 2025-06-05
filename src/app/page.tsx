"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  // Daftar variant yang tersedia
  const variants = [
    "default",
    "secondary",
    "destructive",
    "ghost",
    "outline",
    "link",
  ] as const;

  // State untuk menyimpan variant aktif
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);

  // Fungsi untuk mengubah variant saat tombol diklik
  const handleClick = () => {
    setCurrentVariantIndex((prevIndex) => (prevIndex + 1) % variants.length);
  };

  return (
    <Button variant={variants[currentVariantIndex]} onClick={handleClick}>
      Play! {currentVariantIndex + 1} / {variants.length}
    </Button>
  );
}
