'use client'

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-5 right-5 z-50 rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-lg bg-primary text-white transition-all duration-500 ease-in-out",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-10 pointer-events-none"
      )}
      size="icon"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  )
}
