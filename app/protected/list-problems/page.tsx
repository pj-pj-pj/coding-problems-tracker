"use client";

import ProblemItem from "@/components/problem-item";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [problems, setProblems] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("problems") // Changed from "title" to "problems"
          .select("*");

        console.log(data);

        if (error) throw error;
        setProblems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div>Loading problems...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!problems?.length) return <div>No problems found</div>;

  return (
    <ul className="space-y-2 w-full flex flex-col px-4">
      <span className="flex items-center border-secondary border-2 px-[1.9px] py-[1px]">
        <span className="bg-secondary text-background h-full p-[.6rem]">
          <Search
            size={18}
            strokeWidth={3.2}
          />
        </span>
        <Input
          placeholder="Search problems..."
          className="border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
        />
      </span>
      {problems.map((problem) => (
        <ProblemItem
          key={problem.id}
          problem={problem}
        />
      ))}
    </ul>
  );
}
