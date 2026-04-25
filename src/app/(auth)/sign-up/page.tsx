'use client';

import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceValue } from 'usehooks-ts';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debouncedUsername] = useDebounceValue(username, 300);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${debouncedUsername}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace(`/verify/${username}`);

      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your sign-up. Please try again.');

      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsSubmitting(false);
    }
  };

  const isUsernameAvailable = usernameMessage === 'Username is unique';

  return (
    <div className="flex justify-center items-center min-h-screen bg-background px-4">
      <div className="w-full max-w-sm animate-enter">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">RF</span>
            </div>
            <span className="text-sm font-semibold text-foreground">Real Feedback</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Start receiving anonymous feedback in minutes.
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Username
                  </FormLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="johndoe"
                      className="h-10 pr-9"
                      onChange={(e) => {
                        field.onChange(e);
                        setUsername(e.target.value);
                      }}
                    />
                    {isCheckingUsername && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      </div>
                    )}
                    {!isCheckingUsername && usernameMessage && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {isUsernameAvailable ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                    )}
                  </div>
                  {!isCheckingUsername && usernameMessage && (
                    <p className={`text-xs mt-1 ${isUsernameAvailable ? 'text-green-500' : 'text-destructive'}`}>
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Email
                  </FormLabel>
                  <Input
                    {...field}
                    name="email"
                    placeholder="you@example.com"
                    className="h-10"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    We&apos;ll send a verification code to this address.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    name="password"
                    className="h-10"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-10 text-sm font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>
        </Form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
