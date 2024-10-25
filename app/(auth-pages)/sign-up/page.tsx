import Link from "next/link";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { LockFilledIcon, MailFilledIcon } from "@nextui-org/shared-icons";
import { Spacer } from "@nextui-org/spacer";

import { SubmitButton } from "@/app/ui/submit-button";
import { signUpAction } from "@/app/lib/actions";
import { FormMessage, Message } from "@/app/ui/form-message";

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
    <form className="flex-1 flex flex-col min-w-72">
      <h1 className="text-2xl font-medium">Sign up</h1>
      <p>
        Already have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-in">
          Sign in
        </Link>
      </p>
      <Divider className="my-4" />
      <Input
        required
        endContent={
          <MailFilledIcon className="text-2xl text-default-400 pointer-events-none" />
        }
        label="Email"
        name="email"
        type="email"
      />
      <Spacer y={4} />
      <Input
        required
        endContent={
          <LockFilledIcon className="text-2xl text-default-400 pointer-events-none" />
        }
        label="Password"
        name="password"
        type="password"
      />
      <Spacer y={4} />
      <SubmitButton formAction={signUpAction} pendingText="Signing up...">
        Sign up
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
