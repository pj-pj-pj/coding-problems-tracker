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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("problems").select("*");

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      const { data, error } = await supabase.from("problems").select("*");

      if (error) throw error;
      setProblems(data);

      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("problems")
        .select("*")
        .or(
          `title.ilike.%${searchQuery}%,problem_statement.ilike.%${searchQuery}%,solution_code.ilike.%${searchQuery}%,status.ilike.%${searchQuery}%,difficulty.ilike.%${searchQuery}%`
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProblems(data || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 800);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (loading) return <div>Loading problems...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!problems?.length && !searchQuery) return <div>No problems found</div>;

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
          type="search"
          placeholder="Search problems by title, description, or code..."
          value={searchQuery ? searchQuery : ""}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
        />
      </span>
      {problems?.map((problem) => (
        <ProblemItem
          key={problem.id}
          problem={problem}
        />
      ))}
      {searchQuery && !problems?.length && (
        <div className="text-center text-sm py-6">No problems found...</div>
      )}
    </ul>
  );
}
