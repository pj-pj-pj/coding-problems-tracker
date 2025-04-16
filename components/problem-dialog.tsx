"use client";

import Markdown from "react-markdown";
import { SubmitButton } from "./submit-button";
import { createClient } from "@/utils/supabase/client";

import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Highlight, themes } from "prism-react-renderer";
import { ChevronRight, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ProblemDialog({ problem, setProblems }: any) {
  const [isDeleteClicked, setIsDeleteClicked] = useState<boolean>(false);

  const handleDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("problems")
      .delete()
      .eq("id", problem.id);

    const { data } = await supabase.from("problems").select("*");

    setProblems(data);
    if (error) {
      throw new Error(error.message);
    }

    setIsDeleteClicked(false);
    return true;
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <span className="flex flex-wrap text-base font-semibold items-center mb-1">
            <h2 className="text-wrap truncate pr-3">{problem.title}</h2>
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
        </DialogTitle>
        <DialogDescription>
          <span className="flex items-center">
            -{"  "}
            <span className="pl-4 pr-3 text-nowrap">Difficulty:</span>
            <p>{problem.difficulty}</p>
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

          <div className="overflow-auto max-w-[52.5rem]">
            {problem.problem_statement && (
              <>
                <p className="text-nowrap font-bold pt-3 pb-1">Problem:</p>
                <div className="p-2 px-3 whitespace-pre-wrap text-xs bg-[#ffe3bd] border border-[#ffd9a6] max-h-36 overflow-auto">
                  <Markdown>{problem.problem_statement}</Markdown>
                </div>
              </>
            )}

            {problem.solution_code && (
              <div className="text-xs flex w-full flex-col overflow-auto max-h-[26rem]">
                <p className="font-bold pt-3 pb-1 w-full">Solution Code:</p>
                {/* <Markdown>{problem.solution_code}</Markdown> */}
                <span className="w-full flex-1 py-4 px-4 overflow-auto bg-[#28282a]">
                  <Highlight
                    theme={themes.gruvboxMaterialDark}
                    code={problem.solution_code}
                    language="javascript"
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre style={style}>
                        {tokens.map((line, i) => (
                          <div
                            key={i}
                            {...getLineProps({ line })}
                          >
                            <span>{i + 1}</span>
                            {line.map((token, key) => (
                              <span
                                key={key}
                                {...getTokenProps({ token })}
                              />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </span>
              </div>
            )}
          </div>
        </DialogDescription>

        <div className="mt-4">
          <DialogFooter>
            {!isDeleteClicked ? (
              <DialogFooter>
                <SubmitButton
                  onClick={() => setIsDeleteClicked(true)}
                  className="flex items-center gap-2 bg-destructive hover:bg-red-300 hover:text-destructive hover:border hover:border-destructive"
                >
                  <Trash2 size={14} />
                  Delete Problem
                </SubmitButton>
                <SubmitButton
                  disabled
                  className="bg-violet-700 hover:bg-violet-300 hover:text-violet-700 hover:border hover:border-violet-700"
                >
                  Edit Problem
                </SubmitButton>
              </DialogFooter>
            ) : (
              <div className="text-base font-bold">
                <span>Delete Problem?</span>

                <span className="cursor-pointer flex flex-col">
                  <span
                    className="hover:bg-destructive hover:text-background underline text-destructive flex items-center"
                    onClick={handleDelete}
                  >
                    <ChevronRight
                      size={16}
                      strokeWidth={3}
                      className="mr-3"
                    />
                    Yes
                  </span>
                  <span
                    className="hover:bg-primary underline text-primary hover:text-background flex items-center"
                    onClick={() => setIsDeleteClicked(false)}
                  >
                    <ChevronRight
                      size={16}
                      strokeWidth={3}
                      className="mr-3"
                    />
                    No
                  </span>
                </span>
              </div>
            )}

            <DialogFooter>
              <SubmitButton className="hover:bg-muted hover:border hover:border-primary hover:text-primary">
                <DialogClose>Done</DialogClose>
              </SubmitButton>
            </DialogFooter>
          </DialogFooter>
        </div>
      </DialogHeader>
    </>
  );
}
