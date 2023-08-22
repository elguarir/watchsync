import { redirect } from "next/navigation";
import { useAuthSession } from "@/lib/hooks/useAuthSession";
interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await useAuthSession();
  if (session) {
    return redirect("/dashboard");
  }

  return <div className="min-h-screen">{children}</div>;
}
