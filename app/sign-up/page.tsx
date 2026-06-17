import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { AuthForm } from "@/components/auth-form"
import { AuthHero } from "@/components/auth-hero"

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect("/dashboard")
  return (
    <main className="flex min-h-screen">
      <AuthHero />
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <AuthForm mode="sign-up" />
      </div>
    </main>
  )
}
