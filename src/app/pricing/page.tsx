import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Pricing = () => {
  return (
    <section className="py-32 justify-center flex">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-pretty text-4xl font-bold lg:text-6xl">Pricing</h2>
          <p className="text-muted-foreground lg:text-xl">
            Choose the plan that works best for you
          </p>
          <div className="flex flex-col items-stretch gap-6 md:flex-row">
            <Card className="flex w-80 flex-col justify-between text-left">
              <CardHeader>
                <CardTitle>
                  <p>Starter</p>
                </CardTitle>
                <span className="text-4xl font-bold">Free</span>
              </CardHeader>
              <CardContent>
                <Separator className="mb-6" />
                <ul className="space-y-4">
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Up to 5 team members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Basic components library</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Community support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>1GB storage space</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <a href="https://www.shadcnblocks.com" target="_blank">
                    Purchase
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex w-80 flex-col justify-between text-left">
              <CardHeader>
                <CardTitle>
                  <p>Premium</p>
                </CardTitle>
                <p className="text-sm text-muted-foreground">For personal use</p>
                <span className="text-4xl font-bold">$19</span>
              </CardHeader>
              <CardContent>
                <Separator className="mb-6" />
                <ul className="space-y-4">
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Up to 5 team members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Basic components library</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Community support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>1GB storage space</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <a href="https://www.shadcnblocks.com" target="_blank">
                    Purchase
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex w-80 flex-col justify-between text-left">
              <CardHeader>
                <CardTitle>
                  <p>Professional</p>
                </CardTitle>
                <p className="text-sm text-muted-foreground">For professionals</p>
                <span className="text-4xl font-bold">$49</span>
              </CardHeader>
              <CardContent>
                <Separator className="mb-6" />
                <p className="mb-3 font-semibold">Everything in Plus, and:</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Unlimited team members</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Advanced components</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck className="size-4" />
                    <span>Unlimited storage</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <a href="https://www.shadcnblocks.com" target="_blank">
                    Purchase
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;