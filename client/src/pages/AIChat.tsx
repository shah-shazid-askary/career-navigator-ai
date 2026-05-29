import { useState } from "react";
import { AIAdvisor } from "@/components/AIAdvisor";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

/**
 * Data-Driven Minimalism: AI Chat Page
 * Full-screen interface for AI career advisor
 */

export default function AIChat() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container h-16 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-foreground">Career Advisor</h1>
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8">
        <div className="max-w-2xl mx-auto h-full">
          <AIAdvisor />
        </div>
      </main>
    </div>
  );
}
