import { useState } from "react";
import { Link } from "wouter";
import { SkillGraph } from "@/components/SkillGraph";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Search, TrendingUp, Award, Zap } from "lucide-react";

/**
 * Data-Driven Minimalism: Dashboard Page
 * Main application interface with skill graph visualization and analytics
 * Uses Recharts for data visualization and Zustand-ready state management
 */

interface SkillAnalysis {
  skill: string;
  current: number;
  required: number;
  gap: number;
}

interface JobMatch {
  role: string;
  matchScore: number;
  requiredSkills: string[];
  missingSkills: string[];
}

export default function Dashboard() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"graph" | "analysis" | "recommendations">("graph");

  // Sample skill gap analysis data
  const skillAnalysis: SkillAnalysis[] = [
    { skill: "React", current: 90, required: 95, gap: 5 },
    { skill: "TypeScript", current: 75, required: 85, gap: 10 },
    { skill: "Node.js", current: 80, required: 90, gap: 10 },
    { skill: "SQL", current: 70, required: 85, gap: 15 },
    { skill: "GraphQL", current: 50, required: 75, gap: 25 },
    { skill: "AWS", current: 40, required: 80, gap: 40 },
  ];

  // Sample job matches
  const jobMatches: JobMatch[] = [
    {
      role: "Full Stack Developer",
      matchScore: 85,
      requiredSkills: ["React", "Node.js", "SQL"],
      missingSkills: ["AWS", "GraphQL"],
    },
    {
      role: "Frontend Developer",
      matchScore: 92,
      requiredSkills: ["React", "TypeScript"],
      missingSkills: ["GraphQL"],
    },
    {
      role: "Backend Developer",
      matchScore: 78,
      requiredSkills: ["Node.js", "SQL"],
      missingSkills: ["AWS", "GraphQL", "Docker"],
    },
  ];

  // Demand trend data
  const demandTrend = [
    { month: "Jan", react: 85, python: 78, aws: 65 },
    { month: "Feb", react: 87, python: 80, aws: 68 },
    { month: "Mar", react: 89, python: 82, aws: 72 },
    { month: "Apr", react: 91, python: 85, aws: 75 },
    { month: "May", react: 93, python: 87, aws: 78 },
    { month: "Jun", react: 95, python: 90, aws: 82 },
  ];

  // Skill distribution
  const skillDistribution = [
    { name: "Frontend", value: 35 },
    { name: "Backend", value: 30 },
    { name: "DevOps", value: 20 },
    { name: "Data", value: 15 },
  ];

  const colors = ["#00d9ff", "#00b8d4", "#0097b2", "#007a8f"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-40">
        <div className="container h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Skill Navigator</h1>
            <p className="text-sm text-muted-foreground">AI-powered career analysis</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/ai-chat">
              <Button variant="outline" size="sm">
                AI Advisor
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              Profile
            </Button>
            <Button size="sm">Export Report</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Search and Filters */}
        <motion.div
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search skills or job roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filters</Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-border">
            {(["graph", "analysis", "recommendations"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-smooth ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "graph" && "Skill Graph"}
                {tab === "analysis" && "Gap Analysis"}
                {tab === "recommendations" && "Recommendations"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Graph Tab */}
        {activeTab === "graph" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="h-96">
              <Card className="p-6 h-full border border-border">
                <SkillGraph onNodeClick={(node) => setSelectedSkill(node.id)} />
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid md:grid-cols-4 gap-4"
            >
              {[
                { label: "Total Skills", value: "24", icon: Award },
                { label: "Avg Proficiency", value: "72%", icon: TrendingUp },
                { label: "Skill Gaps", value: "8", icon: Zap },
                { label: "Job Matches", value: "12", icon: Award },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <Card key={idx} className="p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </motion.div>
          </motion.div>
        )}

        {/* Analysis Tab */}
        {activeTab === "analysis" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Skill Gap Chart */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Skill Gap Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                    <XAxis dataKey="skill" stroke="#6b6b6b" />
                    <YAxis stroke="#6b6b6b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e8e8e8",
                        borderRadius: "0.65rem",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="current" fill="#00d9ff" name="Current Level" />
                    <Bar dataKey="required" fill="#e8e8e8" name="Required Level" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Demand Trend */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Market Demand Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={demandTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e8e8e8" />
                    <XAxis dataKey="month" stroke="#6b6b6b" />
                    <YAxis stroke="#6b6b6b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e8e8e8",
                        borderRadius: "0.65rem",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="react"
                      stroke="#00d9ff"
                      name="React"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="python"
                      stroke="#00b8d4"
                      name="Python"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="aws"
                      stroke="#0097b2"
                      name="AWS"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Recommendations Tab */}
        {activeTab === "recommendations" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Job Matches */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-bold text-foreground mb-4">Recommended Job Roles</h3>
              <div className="space-y-4">
                {jobMatches.map((job, idx) => (
                  <Card key={idx} className="p-6 border border-border hover:border-primary/50 transition-smooth">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-foreground">{job.role}</h4>
                        <p className="text-sm text-muted-foreground">Match Score</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{job.matchScore}%</div>
                        <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden mt-2">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${job.matchScore}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                          You Have
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.requiredSkills.map((skill) => (
                            <Badge key={skill} variant="default">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                          You Need
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.missingSkills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-4" variant="outline">
                      View Learning Path
                    </Button>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Skill Distribution */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Skill Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={skillDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {skillDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e8e8e8",
                        borderRadius: "0.65rem",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
