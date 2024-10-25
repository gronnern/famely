import { MailFilledIcon } from "@nextui-org/shared-icons";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { Spacer } from "@nextui-org/spacer";

import { FormMessage, Message } from "@/app/ui/form-message";
import { forgotPasswordAction } from "@/app/lib/actions";
import { SubmitButton } from "@/app/ui/submit-button";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      <form className="flex-1 flex flex-col min-w-72">
        <h1 className="text-2xl font-medium">Reset Password</h1>
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
        <SubmitButton formAction={forgotPasswordAction}>
          Reset Password
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>
    </>
  );
}
