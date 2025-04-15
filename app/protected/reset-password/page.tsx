import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-1 [&>input]:mb-4">
      <span className="flex items-center gap-5 text-violet-500 py-1 pb-2">
        <ChevronDown
          size={20}
          strokeWidth={3}
          className="self-center"
        />
        <h1 className="text-base font-bold">Reset Password</h1>
      </span>
      <p className="text-sm text-foreground/60 mb-3">
        Please enter your new password below.
      </p>
      <Label htmlFor="password">New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        className="border-violet-500"
        required
      />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        className="border-violet-500"
        required
      />
      <SubmitButton
        className="bg-violet-500 hover:text-violet-500 hover:bg-violet-200 hover:border hover:border-violet-500"
        formAction={resetPasswordAction}
      >
        Reset password
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
