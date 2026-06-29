import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import Link from "next/link";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome {session.user?.name}</p>

      <p>{session.user?.email}</p>
      <Link href='/room/create'>Create Room</Link>
      <Link href='/join-room/'>Join room</Link>
      <p>My rooms</p>
      <pre>
        <SignOutButton/>
</pre>
    </div>
  );
}