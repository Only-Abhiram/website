"use client"
import { Wrapper } from '../page'
export default function projects() {
    return <div>
        <Wrapper>

        </Wrapper>
        <Wrapper>
        </Wrapper>
        <Wrapper ><div className="text-4xl font-medium">Projects</div></Wrapper>
        
        <Wrapper>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">

                {projectsList.map((project) => (
                    <ProjectCard
                        key={project.serial}
                        project={project}
                    />
                ))}

            </div>
        </Wrapper>


    </div>
}




import React, { useState } from "react";
// import { Github, ExternalLink, ChevronDown } from "lucide-react";

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
        serial: 2,
        title: "Check Package MCP",
        description:
            "An MCP server that verifies AI-recommended packages across multiple package registries.",
        tech: ["TypeScript", "Cloudflare Workers", "MCP"],
        image: "CheckPackage.png",
        link: "https://checkpackage.abhiram.lol",
        github: ""
    },

    {
        serial: 3,
        title: "Talk to CSV",
        description: "A tool that allows you to talk to a CSV file in simple English. You can upload a CSV file and then ask questions about the data in the file.",
        link: "https://talktocsv.abhiram.lol/",
        github: "https://github.com/Only-Abhiram/talktocsv",
        tech: ["React.js", "TypeScript", "Gemini", "Node.js", "SQLite",],
        image: "TalkToCsv.png"
    },
    {
        serial: 4,
        title: "Autoscale",
        description: "A tool that automates Instagram comment replies for creators using Meta Webhooks. Receives real-time events and triggers instant, rule-based responses from the creator's account — no manual effort required.",
        link: "https://autoscale-nine.vercel.app",
        github: "https://github.com/Only-Abhiram/autoscale",
        tech: ["React", "TypeScript", "Redis"],
        image: ""
    },
    {
        serial: 5,
        title: "Ask Better",
        description: "A Chrome Extension that refines your raw input into clear, powerful prompts before sending — works across ChatGPT, Gemini, and Claude so you get better outputs on the first try.",
        link: "",
        github: "https://github.com/Only-Abhiram/Ask_Better_Chrome_Extension",
        tech: ["React", "TypeScript", "Redis"],
        image: ""
    },


];




const githubIcon = "https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=000000"
const LinkIcon = "https://img.icons8.com/?size=100&id=88586&format=png&color=000000"

function ProjectCard({ project }) {
    return (
        <article className="w-full group">

            {/* Project Image */}
            <div className="w-full aspect-video overflow-hidden rounded-2xl bg-neutral-100">
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

                <h3 className="text-base md:text-lg font-semibold tracking-tight">
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
            <p className="text-sm text-neutral-500 leading-6 mt-3 ">
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
