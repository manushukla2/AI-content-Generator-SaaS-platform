'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Navigate } from "react-router";
export default function Home() {
  const handleClick = () =>{
    window.location.href = '/dashboard';
  }
  return (
    <div>
      <h2>
        Welcome to AI content Generator platform 
      </h2>
      <Button onClick={handleClick}>
        Get started
      
      </Button>
    </div>
  );
}
