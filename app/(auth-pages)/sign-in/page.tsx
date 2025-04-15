import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <span className="flex items-center gap-1 text-primary py-1 pb-2 justify-center">
        <ChevronDown
          size={21}
          strokeWidth={3}
          className="self-center pb-1"
        />
        <h1 className="text-base font-bold">Sign in</h1>
      </span>
      <p className="text-xs text-foreground text-center">
        Don't have an account?{" "}
        <Link
          className="text-destructive font-medium underline hover:bg-destructive hover:text-background px-2"
          href="/sign-up"
        >
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label
          className="text-xs"
          htmlFor="email"
        >
          Email
        </Label>
        <Input
          name="email"
          placeholder="you@example.com"
          required
        />
        <div className="flex justify-between items-center">
          <Label
            className="text-xs"
            htmlFor="password"
          >
            Password
          </Label>
          <Link
            className="text-xs underline text-primary hover:bg-primary hover:text-background px-2"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton
          pendingText="Signing In..."
          formAction={signInAction}
          className="hover:bg-muted hover:border hover:border-primary hover:text-primary"
        >
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
