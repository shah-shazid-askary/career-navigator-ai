import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Data-Driven Minimalism: SkillGraph Component
 * Interactive visualization of skill-to-job relationships
 * Uses SVG canvas for efficient rendering of network graph
 */

interface Node {
  id: string;
  label: string;
  type: "skill" | "job";
  demand: number; // 0-1 scale
  x?: number;
  y?: number;
}

interface Edge {
  source: string;
  target: string;
  weight: number; // 0-1 scale
}

interface SkillGraphProps {
  nodes?: Node[];
  edges?: Edge[];
  onNodeClick?: (node: Node) => void;
}

export function SkillGraph({
  nodes = defaultNodes,
  edges = defaultEdges,
  onNodeClick,
}: SkillGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodePositions, setNodePositions] = useState<Map<string, { x: number; y: number }>>(new Map());

  // Initialize node positions using force-directed layout simulation
  useEffect(() => {
    const positions = new Map<string, { x: number; y: number }>();
    const width = canvasRef.current?.width || 800;
    const height = canvasRef.current?.height || 600;

    // Simple force-directed layout
    nodes.forEach((node, idx) => {
      const angle = (idx / nodes.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.3;
      positions.set(node.id, {
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
      });
    });

    setNodePositions(positions);
  }, [nodes]);

  // Draw graph on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw edges
    edges.forEach((edge) => {
      const source = nodePositions.get(edge.source);
      const target = nodePositions.get(edge.target);

      if (source && target) {
        ctx.strokeStyle = `rgba(0, 217, 255, ${0.1 + edge.weight * 0.3})`;
        ctx.lineWidth = 1 + edge.weight * 2;
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      const pos = nodePositions.get(node.id);
      if (!pos) return;

      const radius = 8 + node.demand * 8;
      const isHovered = hoveredNode === node.id;
      const isSelected = selectedNode?.id === node.id;

      // Node circle
      ctx.fillStyle = node.type === "skill" ? "#00d9ff" : "#e8e8e8";
      if (isHovered || isSelected) {
        ctx.shadowColor = "rgba(0, 217, 255, 0.5)";
        ctx.shadowBlur = 12;
      }
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = "transparent";

      // Node border for selected
      if (isSelected) {
        ctx.strokeStyle = "#00d9ff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + 3, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  }, [nodes, edges, nodePositions, hoveredNode, selectedNode]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let foundNode: string | null = null;

    for (const node of nodes) {
      const pos = nodePositions.get(node.id);
      if (!pos) continue;

      const radius = 8 + node.demand * 8;
      const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);

      if (distance < radius + 5) {
        foundNode = node.id;
        break;
      }
    }

    setHoveredNode(foundNode);
    canvas.style.cursor = foundNode ? "pointer" : "default";
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const node of nodes) {
      const pos = nodePositions.get(node.id);
      if (!pos) continue;

      const radius = 8 + node.demand * 8;
      const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);

      if (distance < radius + 5) {
        setSelectedNode(node);
        onNodeClick?.(node);
        break;
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex-1 rounded-lg border border-border overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-full"
          onMouseMove={handleCanvasMouseMove}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={handleCanvasClick}
        />
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Card className="p-4 border border-border">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      selectedNode.type === "skill" ? "bg-primary" : "bg-muted"
                    }`}
                  />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {selectedNode.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {selectedNode.label}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Market Demand:</span>
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${selectedNode.demand * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {Math.round(selectedNode.demand * 100)}%
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                ✕
              </button>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Skills</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted" />
          <span className="text-muted-foreground">Job Roles</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-px bg-primary/30" />
          <span className="text-muted-foreground">Low Demand</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-px bg-primary" />
          <span className="text-muted-foreground">High Demand</span>
        </div>
      </div>
    </div>
  );
}

// Default sample data
const defaultNodes: Node[] = [
  // Skills
  { id: "react", label: "React", type: "skill", demand: 0.95 },
  { id: "typescript", label: "TypeScript", type: "skill", demand: 0.88 },
  { id: "nodejs", label: "Node.js", type: "skill", demand: 0.85 },
  { id: "python", label: "Python", type: "skill", demand: 0.92 },
  { id: "sql", label: "SQL", type: "skill", demand: 0.90 },
  { id: "graphql", label: "GraphQL", type: "skill", demand: 0.72 },
  { id: "aws", label: "AWS", type: "skill", demand: 0.87 },
  { id: "docker", label: "Docker", type: "skill", demand: 0.80 },

  // Job Roles
  { id: "frontend-dev", label: "Frontend Developer", type: "job", demand: 0.85 },
  { id: "fullstack-dev", label: "Full Stack Developer", type: "job", demand: 0.90 },
  { id: "backend-dev", label: "Backend Developer", type: "job", demand: 0.88 },
  { id: "data-engineer", label: "Data Engineer", type: "job", demand: 0.82 },
  { id: "devops-engineer", label: "DevOps Engineer", type: "job", demand: 0.79 },
];

const defaultEdges: Edge[] = [
  // Frontend Developer
  { source: "react", target: "frontend-dev", weight: 0.95 },
  { source: "typescript", target: "frontend-dev", weight: 0.80 },
  { source: "graphql", target: "frontend-dev", weight: 0.60 },

  // Full Stack Developer
  { source: "react", target: "fullstack-dev", weight: 0.90 },
  { source: "nodejs", target: "fullstack-dev", weight: 0.92 },
  { source: "sql", target: "fullstack-dev", weight: 0.85 },
  { source: "typescript", target: "fullstack-dev", weight: 0.75 },
  { source: "docker", target: "fullstack-dev", weight: 0.70 },

  // Backend Developer
  { source: "nodejs", target: "backend-dev", weight: 0.88 },
  { source: "python", target: "backend-dev", weight: 0.85 },
  { source: "sql", target: "backend-dev", weight: 0.92 },
  { source: "graphql", target: "backend-dev", weight: 0.65 },

  // Data Engineer
  { source: "python", target: "data-engineer", weight: 0.95 },
  { source: "sql", target: "data-engineer", weight: 0.90 },
  { source: "aws", target: "data-engineer", weight: 0.80 },

  // DevOps Engineer
  { source: "docker", target: "devops-engineer", weight: 0.95 },
  { source: "aws", target: "devops-engineer", weight: 0.92 },
  { source: "nodejs", target: "devops-engineer", weight: 0.65 },
];
