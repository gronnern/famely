import { Input } from "@nextui-org/input";
import Link from "next/link";
import { LockFilledIcon, MailFilledIcon } from "@nextui-org/shared-icons";
import { Spacer } from "@nextui-org/spacer";
import { Divider } from "@nextui-org/divider";

import { signInAction } from "@/app/lib/actions";
import { FormMessage, Message } from "@/app/ui/form-message";
import { SubmitButton } from "@/app/ui/submit-button";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <form className="flex-1 flex flex-col min-w-72">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p>
        Don&#39;t have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
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
      <SubmitButton formAction={signInAction} pendingText="Signing In...">
        Sign in
      </SubmitButton>
      <FormMessage message={searchParams} />
      <Divider className="my-4" />
      <p>
        Forgot password?{" "}
        <Link
          className="text-foreground font-medium underline"
          href="/forgot-password"
        >
          Click here
        </Link>
      </p>
    </form>
  );
}
