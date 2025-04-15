"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { createClient } from "@/utils/supabase/client";

export const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),

  problem_url: z.string().optional(),

  solution_url: z.string().optional(),

  problem_statement: z
    .string()
    .max(8000, {
      message:
        "Details must be less than 8000 characters. You may use the Problem URL if the code is too long.",
    })
    .optional(),

  solution_code: z
    .string()
    .max(8000, {
      message:
        "Solution must be less than 8000 characters. You may use the Solution URL if the code is too long.",
    })
    .optional(),

  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    errorMap: () => ({ message: "Please select difficulty" }),
  }),

  status: z.enum(["Solved", "Unsolved", "In Progress"], {
    errorMap: () => ({ message: "Please select status" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function AddProblemForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: FormData) => {
    setSubmitError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in to submit a problem");
      }

      const { error } = await supabase.from("problems").insert({
        ...formData,
        user_id: user.id,
      });

      if (error) throw error;

      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to submit problem"
      );
    }
  };

  const fieldStyles =
    "rounded-xs bg-[#fcdfb8] border-b-2 border-t-0 border-r-0 border-l-0 border-b-primary mb-3 px-2 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:border-b-0 h-7";
  const errorStyles = "text-red-500";
  const textareaStyle =
    "flex h-full w-full border border-input bg-background px-3 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full p-2 text-xs"
    >
      <Label className="text-[.680rem]">
        Title
        <span className={errorStyles}>*</span>
        {errors.title && (
          <span className={errorStyles}>
            {` `}({errors.title.message})
          </span>
        )}
      </Label>
      <Input
        {...register("title")}
        className={fieldStyles}
      />

      <span className="flex gap-2">
        <span className="flex flex-col flex-1/2">
          <Label className="text-[.680rem]">
            Problem URL
            {errors.problem_url && (
              <span className={errorStyles}>
                {` `}({errors.problem_url.message})
              </span>
            )}
          </Label>
          <Input
            {...register("problem_url")}
            className={fieldStyles}
          />
        </span>

        <span className="flex flex-col flex-1/2">
          <Label className="text-[.680rem]">
            Solution URL
            {errors.solution_url && (
              <span className={errorStyles}>
                {` `}({errors.solution_url.message})
              </span>
            )}
          </Label>
          <Input
            {...register("solution_url")}
            className={fieldStyles}
          />
        </span>
      </span>

      <Label className="text-[.680rem]">
        Problem
        {errors.problem_statement && (
          <span className={errorStyles}>
            {` `}({errors.problem_statement.message})
          </span>
        )}
      </Label>
      <textarea
        {...register("problem_statement")}
        className={`${fieldStyles} ${textareaStyle}`}
        rows={10}
      />

      <Label className="text-[.680rem]">
        Solution Code
        {errors.solution_code && (
          <span className={errorStyles}>
            {` `}({errors.solution_code.message})
          </span>
        )}
      </Label>
      <textarea
        {...register("solution_code")}
        className={`${fieldStyles} ${textareaStyle}`}
        rows={12}
      />

      <span className="flex gap-3">
        <span className="flex flex-col">
          <Label className="text-[.680rem]">
            Difficulty
            <span className={errorStyles}>*</span>
            {errors.difficulty && (
              <span className={errorStyles}>
                {` `}({errors.difficulty.message})
              </span>
            )}
          </Label>
          <select
            id="difficulty"
            className={`h-10 ${fieldStyles}`}
            {...register("difficulty", {
              required: "Difficulty is required",
            })}
          >
            <option value="">Select</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </span>

        <span className="flex flex-col">
          <Label className="text-[.680rem]">
            Status
            <span className={errorStyles}>*</span>
            {errors.status && (
              <span className={errorStyles}>
                {` `}({errors.status.message})
              </span>
            )}
          </Label>
          <select
            id="status"
            className={`h-10 ${fieldStyles}`}
            {...register("status", { required: "Status is required" })}
          >
            <option value="">Select</option>
            <option value="Solved">Solved</option>
            <option value="Unsolved">Unsolved</option>
            <option value="In Progress">In Progress</option>
          </select>
        </span>
        <button
          type="submit"
          className="h-9 flex-1/2 cursor-pointer w-full hover:bg-orange-200 text-[#FFEACF] hover:text-primary my-auto bg-primary border-[1px] border-primary px-3 py-2 rounded-xs"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </span>

      {submitError && (
        <div className="col-span-full text-red-500 text-sm mt-2">
          {submitError}. Please try again later.
        </div>
      )}

      {submitSuccess && (
        <div className="col-span-full text-pink-500 text-sm mt-2">
          Problem submitted successfully!
        </div>
      )}
    </form>
  );
}
