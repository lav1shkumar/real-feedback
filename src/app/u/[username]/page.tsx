"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompletion } from "@ai-sdk/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
    streamProtocol: "text",
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to sent message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete("");
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Handle error appropriately
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-start justify-center pt-16 pb-20 px-4">
      <div className="w-full max-w-lg animate-enter">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Send anonymous message
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            @{username}
          </h1>
        </div>

        {/* Message form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Write something honest…"
                      className="resize-none min-h-[140px] text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading || !messageContent}
              className="w-full h-10 text-sm font-medium gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Send message
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Suggestions */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Need inspiration?
            </p>
            <Button
              onClick={fetchSuggestedMessages}
              variant="ghost"
              size="sm"
              className="text-xs h-7 px-3 gap-1.5 text-muted-foreground hover:text-foreground"
              disabled={isSuggestLoading}
            >
              {isSuggestLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Sparkles className="h-3 w-3" />
              )}
              Suggest
            </Button>
          </div>

          <div className="space-y-2">
            {error ? (
              <p className="text-xs text-destructive">
                Failed to generate suggestions. Try again.
              </p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left p-3 rounded-md border border-border bg-card text-sm text-foreground hover:border-primary/30 hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </button>
              ))
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground mb-3">
            Want your own anonymous feedback page?
          </p>
          <Link href="/sign-up">
            <Button variant="outline" size="sm" className="text-xs h-8">
              Create your account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
