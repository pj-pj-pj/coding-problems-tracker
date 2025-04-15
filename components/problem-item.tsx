"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { SubmitButton } from "./submit-button";

export default function ProblemItem({ problem }: any) {
  const [problems, setProblems] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  return (
    <li className="text-xs bg-card hover:bg-orange-200 p-4 border border-secondary w-full flex-1/2 space-y-2">
      <span className="flex gap-3 font-semibold items-center mb-1 max-w-[420px]">
        <h2 className="text-sm truncate">{problem.title}</h2>
        <p
          className={
            problem.status === "Solved"
              ? "text-green-500"
              : problem.status === "Unsolved"
                ? "text-red-400"
                : "text-violet-400"
          }
        >
          [{problem.status}]
        </p>
      </span>
      <span className="flex gap-2 items-center">
        <p className="text-nowrap">Difficulty:</p>
        {problem.difficulty}
      </span>
      {problem.problem_url && (
        <span className="flex items-center">
          <p className="text-nowrap">Problem URL:</p>
          <a
            href={problem.problem_url}
            target="blank"
            className="truncate px-2 hover:bg-secondary hover:underline hover:text-primary-foreground"
          >
            {problem.problem_url}
          </a>
        </span>
      )}
      {problem.solution_url && (
        <span className="flex items-center">
          <p className="text-nowrap">Solution URL:</p>
          <a
            href={problem.solution_url}
            target="blank"
            className="truncate px-2 hover:bg-secondary hover:underline hover:text-primary-foreground"
          >
            {problem.solution_url}
          </a>
        </span>
      )}
      <SubmitButton className="h-8 hover:bg-transparent hover:underline bg-transparent text-secondary font-semibold p-0 text-xs">
        View Problem
      </SubmitButton>
    </li>
  );
}
