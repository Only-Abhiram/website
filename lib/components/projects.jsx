import { div } from 'motion/react-client'
import ProjectCard from './externals/projectcard'
const projectsList = [
    {
      serial: 1,
      title: "Distributed Rate Limiter",
      description:
        "A distributed rate limiting system with multiple algorithms, atomic Redis Lua scripts, response caching and horizontally scalable API gateways.",
      tech: ["Node.js", "Fastify", "Redis", "Lua", "Docker", "Nginx"],
      image: "/projects/rate-limiter.png",
      link: "https://example.com",
      github: "https://github.com/only-abhiram"
    },
    {
      serial: 2,
      title: "Talk to CSV",
      description:
        "An AI-powered application that allows users to upload CSV files and query their data using natural language.",
      tech: ["React", "Node.js", "Express", "SQLite", "Gemini"],
      image: "/projects/talktocsv.png",
      link: "https://talktocsv.abhiram.lol",
      github: "https://github.com/only-abhiram"
    },
    {
      serial: 3,
      title: "Check Package MCP",
      description:
        "An MCP server that verifies AI-recommended packages across multiple package registries.",
      tech: ["TypeScript", "Cloudflare Workers", "MCP"],
      image: "/projects/check-package.png",
      link: "https://checkpackage.abhiram.lol",
      github: ""
    }
  ];
export default function Projects() {
    return<>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">

            {projectsList.map((project) => (
                <ProjectCard
                    key={project.serial}
                    project={project}
                />
            ))}
            </div>

        </>
}