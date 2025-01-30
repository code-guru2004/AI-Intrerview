import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
