"use client";

import ProblemDialog from "./problem-dialog";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export default function ProblemItem({ problem, setProblems }: any) {
  return (
    <li className="text-xs bg-card hover:bg-orange-200 p-4 border border-secondary w-full flex-1/2 space-y-1">
      <span className="flex text-sm gap-3 font-semibold items-center mb-3 max-w-[480px]">
        <h2 className="truncate">{problem.title}</h2>
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
      <span className="flex items-center">
        -{"  "}
        <p className="pl-4 pr-3 text-nowrap">Difficulty:</p>
        {problem.difficulty}
      </span>
      {problem.problem_url && (
        <span className="flex items-center">
          -{"  "}
          <p className="pl-4 pr-1 text-nowrap">Problem URL:</p>
          <a
            href={problem.problem_url}
            target="blank"
            className="truncate px-2 hover:underline text-violet-700"
          >
            {problem.problem_url}
          </a>
        </span>
      )}
      {problem.solution_url && (
        <span className="flex items-center">
          -{"  "}
          <p className="pl-4 pr-1 text-nowrap">Solution URL:</p>
          <a
            href={problem.solution_url}
            target="blank"
            className="truncate px-2 hover:underline text-violet-700"
          >
            {problem.solution_url}
          </a>
        </span>
      )}
      <div className="h-2 text-background">-</div>
      <Dialog>
        <DialogTrigger className="hover:bg-secondary hover:text-primary-foreground underline bg-transparent text-secondary font-semibold p-0 text-xs hover:px-2">
          View Problem
        </DialogTrigger>
        <DialogContent>
          <ProblemDialog
            problem={problem}
            setProblems={setProblems}
          />
        </DialogContent>
      </Dialog>
    </li>
  );
}
