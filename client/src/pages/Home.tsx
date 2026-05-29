import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Zap, TrendingUp, Brain, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

/**
 * Data-Driven Minimalism Design System
 * Hero section with skill graph visualization and feature cards
 * Uses teal accent (#00d9ff) on white background with Poppins headings
 */

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Gemma4 LLM analyzes your skills and identifies gaps in real-time job market demands",
    },
    {
      icon: TrendingUp,
      title: "Skill-to-Job Mapping",
      description: "Interactive graph visualization showing relationships between skills and 1000+ job roles",
    },
    {
      icon: Zap,
      title: "Micro-Credentials",
      description: "Personalized recommendations for specific certifications and learning paths",
    },
    {
      icon: Sparkles,
      title: "Predictive Insights",
      description: "Forecast emerging skills and career trajectories based on market trends",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">CareerNavigator AI</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              How It Works
            </a>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Hero Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663212860679/HhzX3E3AycMWCKruKcY5Rp/hero-background-XWWcz8iAp4X6e85HAaS3Gn.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-white/95 z-1" />

        <div className="container relative z-10 py-24 md:py-32">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                Powered by Gemma4 LLM + Neo4j Graph Database
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Map Your Skills to the{" "}
              <span className="text-primary">Future of Work</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              CareerNavigator AI analyzes real-time job market demands and identifies the exact micro-credentials you need
              to advance your career. Get personalized skill-gap analysis powered by cutting-edge AI.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Explore Skill Graph <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background border-t border-border">
        <div className="container">
          <motion.div
            className="max-w-2xl mx-auto text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3
              variants={itemVariants}
              className="text-4xl font-bold text-foreground mb-4"
            >
              Intelligent Career Mapping
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground"
            >
              Advanced analytics and AI-driven insights to guide your professional growth
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div key={idx} variants={itemVariants}>
                  <Card className="p-8 border border-border hover:border-primary/50 transition-smooth h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-secondary/30 border-t border-border">
        <div className="container">
          <motion.div
            className="max-w-2xl mx-auto text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3
              variants={itemVariants}
              className="text-4xl font-bold text-foreground mb-4"
            >
              How It Works
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground"
            >
              Three simple steps to discover your career path
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                step: "01",
                title: "Input Your Skills",
                description: "Tell us about your current technical and soft skills",
              },
              {
                step: "02",
                title: "Analyze Market Demand",
                description: "Our AI analyzes 1000+ job roles and skill requirements",
              },
              {
                step: "03",
                title: "Get Recommendations",
                description: "Receive personalized micro-credential recommendations",
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3
              variants={itemVariants}
              className="text-4xl font-bold text-foreground mb-6"
            >
              Ready to Navigate Your Career?
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8"
            >
              Start your personalized skill analysis today and discover your path to career growth
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Launch Skill Navigator <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/50 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">CareerNavigator AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 CareerNavigator AI. Powered by Gemma4 LLM and Neo4j.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
