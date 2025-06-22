"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MailWarning, Loader2 } from "lucide-react";

export function EmailVerificationBanner() {
  const { user, loading, resendVerificationEmail } = useAuth();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleResend = async () => {
    setIsSending(true);
    try {
      await resendVerificationEmail();
      toast({
        title: "Email Sent!",
        description: "A new verification email has been sent to your inbox.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send verification email. Please try again later.",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return null;
  }

  const isPasswordProvider = user?.providerData.find(
    (p) => p.providerId === "password"
  );

  if (!user || user.emailVerified || !isPasswordProvider) {
    return null;
  }

  return (
    <div className="bg-yellow-100 border-b border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-800">
        <div className="container mx-auto">
            <Alert variant="default" className="rounded-none border-none bg-transparent px-0 py-3">
                <MailWarning className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <AlertTitle className="text-yellow-800 dark:text-yellow-200 font-bold">Action Required: Verify Your Email</AlertTitle>
                <AlertDescription className="text-yellow-700 dark:text-yellow-300 flex items-center justify-between">
                    <span>Please check your inbox to verify your email address.</span>
                    <Button
                        variant="link"
                        className="p-0 h-auto text-yellow-800 dark:text-yellow-200 font-bold underline"
                        onClick={handleResend}
                        disabled={isSending}
                        >
                        {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Resend verification email
                    </Button>
                </AlertDescription>
            </Alert>
        </div>
    </div>
  );
}
