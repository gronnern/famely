"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Spacer } from "@nextui-org/spacer";
import { useRouter } from "next/navigation";
import { Divider } from "@nextui-org/divider";

import { title } from "@/app/ui/primitives";

export default function Dashboard() {
  const router = useRouter();

  return (
    <>
      <h1 className={title()}>Dashboard</h1>
      <Spacer y={4} />
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-2">
        <Card
          isPressable
          className="max-w-[400px]"
          onPress={() => router.push("/dashboard/lists")}
        >
          <CardHeader className="flex gap-3">
            <p className="text-md">Lists</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Create lists for shopping or reminders.</p>
          </CardBody>
        </Card>
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <p className="text-md">Calendar (WIP)</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Manage your family calendar.</p>
          </CardBody>
        </Card>
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <p className="text-md">Weekly menu (WIP)</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>See the week&#39;s dinner menu.</p>
          </CardBody>
        </Card>
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <p className="text-md">Messages (WIP)</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Send and receive messages.</p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
