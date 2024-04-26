import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export default async function Products() {
  return (
    <div>
      <h1>Welcome!</h1>
    </div>
  );
}
