import AddProblemForm from "@/components/add-problem-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <AddProblemForm />
    </div>
  );
}
