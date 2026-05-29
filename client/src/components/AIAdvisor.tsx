import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Sparkles } from "lucide-react";

/**
 * Data-Driven Minimalism: AI Advisor Component
 * Chat interface for Ollama Gemma4 LLM integration
 * Provides career guidance and skill recommendations
 */

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIAdvisorProps {
  onClose?: () => void;
}

export function AIAdvisor({ onClose }: AIAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI Career Advisor powered by Gemma4. I can help you analyze your skills, identify gaps, and recommend the best learning paths. What would you like to know about your career development?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate API call to Ollama Gemma4
      // In production, this would call your FastAPI backend which proxies to Ollama
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(input),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("react") || lowerInput.includes("frontend")) {
      return "Based on current market trends, React skills are in high demand with 95% market penetration. Your proficiency is strong, but consider adding GraphQL and TypeScript to your toolkit. I recommend the following learning path: 1) Advanced React patterns (2-3 weeks), 2) GraphQL fundamentals (2 weeks), 3) TypeScript mastery (3 weeks). This should position you well for senior frontend roles.";
    }

    if (lowerInput.includes("aws") || lowerInput.includes("cloud")) {
      return "AWS is one of the fastest-growing skills with 87% demand increase YoY. Your current gap is significant, but it's a great investment. Start with: 1) AWS Fundamentals (EC2, S3, RDS) - 4 weeks, 2) AWS Solutions Architect Associate cert - 6 weeks, 3) Hands-on projects - 4 weeks. This will open doors to DevOps and cloud architecture roles.";
    }

    if (lowerInput.includes("salary") || lowerInput.includes("pay")) {
      return "Career progression impacts salary significantly. Based on your skills, a Full Stack Developer role pays $120-150k, while a Senior role with AWS expertise commands $160-200k+. The skills you're missing (AWS, GraphQL) could increase your earning potential by 25-35%. Focus on these high-impact skills for maximum ROI.";
    }

    if (lowerInput.includes("career") || lowerInput.includes("path")) {
      return "Your ideal career path: Frontend Developer → Full Stack Developer → Tech Lead. Timeline: 1.5 years to Full Stack (add Node.js + SQL), 3 years to Tech Lead (add system design + mentoring). Key skills to prioritize: TypeScript, GraphQL, AWS, Docker. Would you like me to create a detailed 6-month learning plan?";
    }

    return "That's a great question! Based on the current job market analysis and your skill profile, I'd recommend focusing on high-demand skills that complement your existing expertise. Would you like me to analyze specific skills or create a personalized learning roadmap for you?";
  };

  return (
    <Card className="flex flex-col h-full border border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">AI Career Advisor</h3>
            <p className="text-xs text-muted-foreground">Powered by Gemma4</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            ✕
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" as const }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-secondary text-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.role === "user"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-secondary text-foreground px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">AI Advisor is thinking...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Ask about skills, career paths, or learning recommendations..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>

        {/* Suggested Questions */}
        <div className="mt-3 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Suggested:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "How to learn AWS?",
              "Career path to Tech Lead",
              "React vs Vue comparison",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="text-xs px-2 py-1 rounded border border-border hover:border-primary text-muted-foreground hover:text-foreground transition-smooth"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
