import { redirect } from "next/navigation";

async function CategoryPage() {
  redirect("/new-arrivals/new");
}

export default CategoryPage;
