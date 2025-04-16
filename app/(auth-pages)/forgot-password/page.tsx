import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <span className="flex items-center gap-3 text-violet-500 py-1 pb-2">
            <ChevronDown
              size={20}
              strokeWidth={3}
              className="self-center"
            />
            <h1 className="text-base font-bold">Reset Password</h1>
          </span>
          <p className="text-xs text-foreground">
            Already have an account?{" "}
            <Link
              className="text-primary underline hover:bg-primary hover:text-background px-2"
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            className="border-violet-500"
            required
          />
          <SubmitButton
            className="bg-violet-500 hover:text-violet-500 hover:bg-violet-200 hover:border hover:border-violet-500"
            formAction={forgotPasswordAction}
          >
            Reset password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
