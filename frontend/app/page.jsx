import { redirect } from "next/navigation";
export { default } from './(main)/page';
export default function RootPage() {
  redirect("/");
}