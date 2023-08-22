import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const useAuthSession = async () => {
  const session: Session | null = await getServerSession(authOptions);
  return session;
};
