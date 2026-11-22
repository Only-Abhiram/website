
import MinimalButton from '@/lib/components/minimalButton'
const projects = [
]





const projectsList = [
  {
    serial: 1,
    title: "Distributed Rate Limiter",
    description:
      "A distributed rate limiting system with multiple algorithms, atomic Redis Lua scripts, response caching and horizontally scalable API gateways.",
    tech: ["Node.js", "Fastify", "Redis", "Lua", "Docker", "Nginx"],
    image: "RateLimiter.png",
    link: "https://example.com",
    github: "https://github.com/only-abhiram"
  },
  {
    serial: 3,
    title: "Talk to CSV",
    description:
      "An AI-powered application that allows users to upload CSV files and query their data using natural language.",
    tech: ["React", "Node.js", "Express", "SQLite", "Gemini"],
    image: "TalkToCsv.png",
    link: "https://talktocsv.abhiram.lol",
    github: "https://github.com/only-abhiram"
  },
  {
    serial: 2,
    title: "Check Package MCP",
    description:
      "An MCP server that verifies AI-recommended packages across multiple package registries.",
    tech: ["TypeScript", "Cloudflare Workers", "MCP"],
    image: "CheckPackage.png",
    link: "https://checkpackage.abhiram.lol",
    github: ""
  }
];


function ProjectCard({ project }) {
  return (
    <article className="w-full group">

      {/* Project Image */}
      <div className="w-full aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            Project Preview
          </div>
        )}
      </div>

      {/* Title and Links */}
      <div className="flex items-center justify-between gap-4 mt-4">

        <h3 className="text-lg font-semibold tracking-tight">
          {project.title}
        </h3>

        <div className="flex items-center gap-3 shrink-0">

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live project"
              className="text-neutral-500 hover:text-black transition"
            >
              <img src={LinkIcon} alt="" className="h-7" />
              {/* <ExternalLink size={17} /> */}
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-neutral-500 hover:text-black transition"
            >

              <img src={githubIcon} alt="" className="h-7" />
              {/* <Github size={18} /> */}
            </a>
          )}

        </div>
      </div>

      {/* Description - Always Visible */}
      <p className="text-xm text-neutral-500 leading-6 mt-3 ">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mt-4">
        {(Array.isArray(project.tech)
          ? project.tech
          : project.tech?.split(",").map(t => t.trim()) || []
        ).map((technology, index) => (
          <span
            key={index}
            className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600 text-xs"
          >
            {technology}
          </span>
        ))}
      </div>

    </article>
  );
}



const githubIcon = "https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=000000"
const LinkIcon = "https://img.icons8.com/?size=100&id=88586&format=png&color=000000"



export default function ProjectsList() {
  return (
    <section className="w-full max-w-3xl">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10">

        {[...projectsList]
          .sort((a, b) => a.serial - b.serial)
          .map((project) => (
            <ProjectCard
              key={project.serial}
              project={project}
            />
          ))}
        <MinimalButton text={"View All Projects"} href={"/projects"}></MinimalButton>

      </div>
    </section>
  );
}