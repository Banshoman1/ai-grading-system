import { GraduationCap, CheckCircle2 } from "lucide-react"

export function AuthHero() {
  const points = [
    "AI grades theory & essay answers in seconds",
    "Personalized feedback for every student",
    "Track performance across courses and sessions",
  ]
  return (
    <aside className="hidden w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
      <div className="flex items-center gap-2">
        <GraduationCap className="h-7 w-7" />
        <span className="font-serif text-xl font-bold">LeadGrade AI</span>
      </div>

      <div className="max-w-md">
        <h2 className="font-serif text-4xl font-bold leading-tight text-balance">
          Smart grading & feedback for Lead City University
        </h2>
        <p className="mt-4 text-primary-foreground/80 text-pretty">
          Built for Nigerian lecturers. Spend less time marking scripts and more
          time teaching — let AI handle the first pass while you stay in control.
        </p>
        <ul className="mt-8 flex flex-col gap-3">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span className="text-sm text-primary-foreground/90">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-primary-foreground/60">
        Lead City University · Ibadan, Nigeria
      </p>
    </aside>
  )
}
