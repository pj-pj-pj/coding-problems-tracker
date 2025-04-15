import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <form className="flex flex-col min-w-64 max-w-64 mx-auto">
      <span className="flex items-center gap-3 text-destructive py-1 pb-2">
        <ChevronDown
          size={20}
          strokeWidth={3}
          className="self-center"
        />
        <h1 className="text-base font-bold">Sign up</h1>
      </span>
      <p className="text-xs text-foreground text-center">
        Already have an account?{" "}
        <Link
          className="text-primary font-medium underline hover:bg-primary hover:text-background px-2"
          href="/sign-in"
        >
          Sign in
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          placeholder="you@example.com"
          className="border-destructive"
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          minLength={6}
          className="border-destructive"
          required
        />
        <SubmitButton
          className="bg-destructive hover:bg-red-300 hover:text-destructive hover:border hover:border-destructive"
          formAction={signUpAction}
          pendingText="Signing up..."
        >
          Sign up
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
