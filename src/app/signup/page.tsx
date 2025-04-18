"use client";

import React, { useState } from "react";
import { WrappedLogo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/utils/auth-client";
import { validateEmail, validatePassword } from "@/utils/validation/client/signup";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion"; 
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SignUp () {
  const [firstTime, setFirstTime] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailVal = e.target.value;
    setEmail(emailVal);

    if (firstTime) return;

    const { message, success } = validateEmail(emailVal);

    if (!success) {
      setEmailError(message);
    } else {
      setEmailError('');
    }
  }
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const passwordVal = e.target.value;
    setPassword(passwordVal);

    if (firstTime) return;

    const { message, success } = validatePassword(passwordVal);

    if (!success) {
      setPasswordError(message);
    } else {
      setPasswordError('');
    }
  }

  const handleGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google"
    });
  }
  
  const handleGithub = async () => {
    const data = await authClient.signIn.social({
      provider: 'github'
    });
  }

  const handleCredentials = async () => {
    if (emailError || passwordError) {
      setFirstTime(false);
      return;
    }


    const { data, error } = await authClient.signUp.email({ 
      email, 
      password,
      name: email
    }, {
      onRequest: (ctx) => { 
        setLoading(true);
      }, 
      onSuccess: (ctx) => {
        console.log(ctx.data);
        router.push("/dashboard");
      }, 
      onError: (ctx) => { 
        setFirstTime(false);
        console.error(ctx.error);
        setLoading(false);
        toast({
          title: "Something went wrong",
          description: ctx.error.message,
          variant: "destructive",
        });
      },
    });
  }

  return (
    <section className="sm:py-32 h-screen sm:items-center justify-center flex sm:bg-muted">
      <Card className="container bg-background max-w-md h-[600px] border-0 sm:border">
        <div className="flex flex-col gap-4 h-full justify-center">
          <div className="mx-auto w-full max-w-md rounded-md p-6 sm:p-8 shadow ">
            {!loading ? (
              <div>
                <div className="mb-6 flex flex-col items-center">
                  <WrappedLogo scale={1.5} adjusted={false} />
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-4">
                    <Label htmlFor="email">
                      Email
                    </Label>
                    <Input 
                      type="email" 
                      required 
                      className="h-12"
                      onChange={(e) => handleEmailChange(e)}
                    />
                    {emailError && (
                      <p className="text-sm text-red-400">
                        {emailError}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-4 mt-2">
                    <Label htmlFor="password">
                      Password
                    </Label>
                    <Input
                      type="password"
                      required
                      className={cn("h-12", { "border": passwordError })}
                      onChange={(e) => handlePasswordChange(e)}
                    />
                    {passwordError && (
                      <p className="text-sm text-red-400">
                        {passwordError}
                      </p>
                    )}
                  </div>
                  <Button className="mt-2 w-full h-12" onClick={handleCredentials}>
                    Continue
                  </Button>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-2 mb-2">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                  <div className="gap-4 flex flex-row justify-center items-center">
                    <Button variant="outline" className="w-full h-12">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                          fill="currentColor"
                        />
                      </svg>
                    </Button>
                    <Button variant="outline" className="w-full h-12">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={24} width={24}>
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                      </svg>
                    </Button>
                  </div>
                </div>
                <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                  <p>Already have an account?</p>
                  <Link href="/login" className="font-medium text-primary">
                    Log in
                  </Link>
                </div>
              </div>
            ) : (
              <div className="items-center flex flex-col gap-6">
                <WrappedLogo scale={1.5} adjusted={false} />
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <LoaderCircle size={48} />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </section>
  );
};