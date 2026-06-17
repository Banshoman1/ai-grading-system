import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "LeadGrade AI — Smart Grading & Feedback for Lead City University",
  description:
    "AI-powered grading and personalized feedback system for Nigerian universities. Built for Lead City University lecturers to grade exams, generate feedback, and track student performance.",
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#1f6e43",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
