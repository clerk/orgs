'use client';

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export function ClientComponent() {


  useEffect(() => {
    window.customReload = () => {
      console.log("Custom reload function running!")
      useRouter().refresh()
    }

    () => {
      window.customReload = null
    }
  }, [])
  return (
    <p></p>
  )
}
