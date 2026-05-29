# CareerNavigator AI - Project Guide

## Overview

CareerNavigator AI is an intelligent platform that maps student skills to real-time job market demands, recommending specific micro-credentials through predictive skill-gap analysis. The platform combines React frontend visualization with Ollama Gemma4 LLM for AI-powered career guidance.

## Design Philosophy: Data-Driven Minimalism

The entire platform follows a **Data-Driven Minimalism** design system emphasizing clarity, precision, and information hierarchy.

### Visual Language

**Typography:**
- **Headings**: Poppins Bold (700) - geometric, modern, authoritative
- **Body**: Inter Regular (400) - neutral, highly readable
- **Spacing**: Strict 8px grid system with 1.5x line-height for readability

**Color Palette:**
- **Primary Accent**: #00d9ff (vibrant teal) - conveys innovation and tech credibility
- **Background**: #ffffff (light mode) / #0f1419 (dark mode)
- **Text**: #1a1a1a (light mode) / #e8e8e8 (dark mode)
- **Supporting**: Light grays (#f5f5f5, #e8e8e8) for hierarchy and breathing room

**Interaction Design:**
- Smooth state transitions using cubic-bezier(0.23, 1, 0.32, 1) easing
- Node entrance animations: fade-in + scale (0.95 → 1) over 400ms
- Glow effects on hover for interactive elements
- Snappy button feedback with scale(0.97) on active state

## Project Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── Home.tsx           # Landing page with hero section
│   │   ├── Dashboard.tsx       # Main application with skill graph
│   │   ├── AIChat.tsx          # Full-screen AI advisor interface
│   │   └── NotFound.tsx        # 404 page
│   ├── components/
│   │   ├── SkillGraph.tsx      # Interactive skill-to-job visualization
│   │   ├── AIAdvisor.tsx       # Chat interface for Gemma4 LLM
│   │   └── ui/                 # shadcn/ui components
│   ├── contexts/
│   │   └── ThemeContext.tsx    # Theme management
│   ├── App.tsx                 # Route definitions
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles with design tokens
├── index.html                  # HTML template
└── public/                     # Static assets (favicon, robots.txt only)
```

## Key Features

### 1. Skill Graph Visualization
**File**: `client/src/components/SkillGraph.tsx`

Interactive canvas-based graph showing relationships between skills and job roles:
- **Nodes**: Skills (teal circles) and Job Roles (gray circles)
- **Edges**: Weighted connections representing market demand
- **Interactions**: Hover for glow effect, click to view details
- **Node sizing**: Proportional to market demand (0-1 scale)

**Sample Data**:
- 8 core skills: React, TypeScript, Node.js, Python, SQL, GraphQL, AWS, Docker
- 5 job roles: Frontend Dev, Full Stack Dev, Backend Dev, Data Engineer, DevOps Engineer

### 2. Dashboard Analytics
**File**: `client/src/pages/Dashboard.tsx`

Three-tab interface for comprehensive career analysis:

**Tab 1: Skill Graph**
- Interactive visualization of skill-to-job relationships
- Quick stats cards showing total skills, proficiency, gaps, and matches

**Tab 2: Gap Analysis**
- Bar chart comparing current vs. required skill levels
- Line chart showing market demand trends over time
- Identifies priority skills to learn

**Tab 3: Recommendations**
- Job role matches with compatibility scores
- Shows required skills (you have) vs. missing skills (you need)
- Skill distribution pie chart (Frontend 35%, Backend 30%, DevOps 20%, Data 15%)

### 3. AI Career Advisor
**File**: `client/src/components/AIAdvisor.tsx` & `client/src/pages/AIChat.tsx`

Chat interface powered by Ollama Gemma4 LLM:
- **Mock responses** for frontend demonstration
- **Ready for backend integration** via FastAPI proxy
- **Suggested prompts** for common career questions
- **Real-time streaming** support (when backend is connected)

**Sample advisor capabilities**:
- React/Frontend guidance with learning paths
- AWS/Cloud skill recommendations
- Salary impact analysis based on skills
- Career progression roadmaps

## Technology Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4 with custom design tokens
- **Animations**: Framer Motion (snappy 200-400ms transitions)
- **Charts**: Recharts (bar, line, pie charts)
- **UI Components**: shadcn/ui (pre-built accessible components)
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: Ready for Zustand integration

### Design System
- **Typography**: Poppins (headings) + Inter (body)
- **Icons**: Lucide React
- **Color**: OKLCH color space (CSS variables)
- **Animations**: GPU-optimized (transform + opacity only)

### Backend Integration (Ready)
- **LLM**: Ollama Gemma4 (31B parameters, 128K-256K context)
- **Graph DB**: Neo4j Aura (skill-to-job relationships)
- **Primary DB**: Supabase PostgreSQL
- **Vector Search**: ChromaDB (semantic skill matching)
- **Cache**: Upstash Redis (serverless)

## Getting Started

### Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Type checking
pnpm check

# Build for production
pnpm build
```

### Navigation
- **Home**: `http://localhost:3000/`
- **Dashboard**: `http://localhost:3000/dashboard`
- **AI Chat**: `http://localhost:3000/ai-chat`

## Customization Guide

### Adding New Skills/Jobs to Graph

Edit `client/src/components/SkillGraph.tsx`:

```typescript
const defaultNodes: Node[] = [
  { id: "new-skill", label: "New Skill", type: "skill", demand: 0.85 },
  { id: "new-job", label: "New Job Role", type: "job", demand: 0.90 },
];

const defaultEdges: Edge[] = [
  { source: "new-skill", target: "new-job", weight: 0.80 },
];
```

### Updating Color Scheme

Edit `client/src/index.css` (CSS variables):

```css
:root {
  --primary: #00d9ff;      /* Change teal accent */
  --background: #ffffff;   /* Change background */
  --foreground: #1a1a1a;   /* Change text color */
}
```

### Connecting Ollama Backend

The `AIAdvisor` component is ready for backend integration:

```typescript
// In AIAdvisor.tsx, replace generateMockResponse with:
const response = await fetch("https://your-api.com/api/chat", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${OLLAMA_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "gemma4:31b-cloud",
    messages: [{ role: "user", content: input }],
    stream: true
  })
});
```

## Performance Optimizations

1. **Canvas-based Graph**: Efficient rendering of 1000+ nodes without DOM overhead
2. **GPU Animations**: Only transform and opacity are animated (no layout thrashing)
3. **Lazy Loading**: Components load on route navigation
4. **Memoization**: Ready for React.memo optimization
5. **Code Splitting**: Each page is a separate route bundle

## Accessibility

- **Semantic HTML**: Proper heading hierarchy (h1, h2, h3)
- **Color Contrast**: WCAG AA compliant (dark text on light backgrounds)
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Management**: Visible focus rings on all buttons
- **Reduced Motion**: Respects `prefers-reduced-motion` media query

## Future Enhancements

1. **Real Ollama Integration**: Connect to actual Gemma4 backend
2. **Neo4j Graph Database**: Replace mock data with real skill-job relationships
3. **User Authentication**: Manus OAuth integration
4. **Personalization**: Save user profiles and learning paths
5. **Real-time Updates**: GraphQL subscriptions for market demand changes
6. **Mobile App**: React Native version
7. **Micro-credentials**: Integration with Coursera, Udemy, LinkedIn Learning
8. **Salary Predictions**: ML model for salary forecasting

## Design Decisions

### Why Data-Driven Minimalism?

1. **Clarity**: Complex data (skill graphs, job relationships) needs minimal visual noise
2. **Professionalism**: Teal + charcoal conveys tech expertise and trustworthiness
3. **Performance**: Minimal animations and decorative elements = faster load times
4. **Accessibility**: High contrast and clear typography benefit all users
5. **Scalability**: Clean design system makes it easy to add new features

### Why Canvas for Graph Visualization?

1. **Performance**: Handles 1000+ nodes efficiently
2. **Customization**: Full control over rendering and interactions
3. **Simplicity**: No external graph library dependencies
4. **Responsiveness**: Scales to any screen size

### Why Recharts for Analytics?

1. **Accessibility**: Built-in support for screen readers
2. **Responsive**: Automatically adapts to container size
3. **Customization**: Extensive props for styling and behavior
4. **Performance**: Optimized rendering with memoization

## Deployment

The project is ready for deployment to Vercel:

```bash
# Build
pnpm build

# Deploy
vercel deploy
```

Environment variables needed:
- `VITE_OLLAMA_API_KEY`: Ollama API key (frontend)
- `VITE_APP_TITLE`: Application title
- `VITE_ANALYTICS_ENDPOINT`: Analytics endpoint

## Support & Troubleshooting

### TypeScript Errors
```bash
pnpm check
```

### Development Server Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Style Issues
Check that `client/src/index.css` is properly imported in `client/src/main.tsx`

## License

MIT - See LICENSE file for details

---

**Last Updated**: May 29, 2026
**Design System Version**: 1.0 (Data-Driven Minimalism)
**Framework Version**: React 19 + Vite 7.1
