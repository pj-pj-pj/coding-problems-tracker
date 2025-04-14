"use client";

import { createClient } from "@/utils/supabase/client";
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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Problems List</h1>
      <ul className="space-y-2">
        {problems.map((problem) => (
          <li
            key={problem.id}
            className="p-4 border rounded-lg"
          >
            <h2 className="text-xl font-semibold">{problem.title}</h2>
            <p>Difficulty: {problem.difficulty}</p>
            <p>Status: {problem.status}</p>
            {problem.problem_url && (
              <a
                href={problem.problem_url}
                className="text-blue-500 hover:underline"
              >
                Problem Link
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
