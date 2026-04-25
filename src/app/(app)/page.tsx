'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight, MessageCircle, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-20 bg-background text-foreground relative">
        {/* Subtle grid background */}
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

        <section className="text-center mb-20 max-w-2xl mx-auto relative animate-enter">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs text-muted-foreground font-medium mb-8">
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Anonymous feedback, redefined
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground leading-[1.1]">
            Honest feedback,
            <br />
            <span className="text-primary">zero awkwardness.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10">
            Create your personal link, share it anywhere, and receive candid, anonymous messages from people who matter.
          </p>

          <div className="flex justify-center gap-3">
            <Link href="/sign-up">
              <Button size="lg" className="h-11 px-6 text-sm font-medium gap-2">
                Get started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-6 text-sm font-medium"
              >
                Sign in
              </Button>
            </Link>
          </div>
        </section>

        {/* Value props */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-20 w-full relative animate-slide-up">
          {[
            {
              icon: Shield,
              title: 'Fully anonymous',
              desc: 'Senders stay completely hidden. No accounts needed to send.',
            },
            {
              icon: Zap,
              title: 'Instant delivery',
              desc: 'Messages appear on your dashboard the moment they\'re sent.',
            },
            {
              icon: MessageCircle,
              title: 'AI suggestions',
              desc: 'Not sure what to say? AI generates thoughtful prompts.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <item.icon className="w-5 h-5 text-primary mb-3" />
              <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Carousel for Messages */}
        <section className="w-full max-w-lg relative animate-slide-up">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium text-center mb-4">
            Recent messages
          </p>
          <Carousel
            plugins={[Autoplay({ delay: 4000 })]}
            className="w-full"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-2">
                  <Card className="border-border bg-card">
                    <CardHeader className="pb-2">
                      <p className="text-xs text-muted-foreground font-medium">
                        {message.title}
                      </p>
                    </CardHeader>
                    <CardContent className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="space-y-1.5 min-w-0">
                        <p className="text-sm text-foreground leading-relaxed">
                          {message.content}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {message.received}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </main>

      <footer className="text-center py-6 border-t border-border text-muted-foreground text-xs">
        © {new Date().getFullYear()} Real Feedback
      </footer>
    </>
  );
}
