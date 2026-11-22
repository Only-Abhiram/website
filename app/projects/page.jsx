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
            "Built a distributed API gateway using Node.js, Fastify, Redis, and Nginx, implementing Fixed Window, Token Bucket, and Sliding Window rate-limiting algorithms with atomic Redis Lua scripts to ensure consistent quota enforcement across multiple gateway replicas. Integrated Redis response caching with a 30-second TTL and containerized the system using Docker Compose. Load-tested with k6, achieving 3,438 RPS, a 99.99% cache hit ratio, and zero HTTP failures at 50 concurrent virtual users.",
        tech: ["Node.js", "Fastify", "Redis", "Lua", "Docker", "Nginx"],
        image: "RateLimiter.png",
        link: "",
        github: "https://github.com/Only-Abhiram/distributed-api-rate-limiter"
    },

    {
        serial: 2,
        title: "Check Package MCP",
        description:
            "Developed a remote Model Context Protocol (MCP) server that enables AI coding agents to verify software dependencies and detect hallucinated, non-existent, or slopsquatted packages before installation. Integrated six package registries — npm, PyPI, Maven Central, NuGet, Cargo, and Go — into a unified verification tool that checks package existence, version availability, and deprecation status. Designed structured responses with five information fields and three reason codes, and deployed the serverless application on Cloudflare Workers at zero monthly hosting cost.",
        tech: ["TypeScript", "Cloudflare Workers", "MCP"],
        image: "CheckPackage.png",
        link: "https://checkpackage.abhiram.lol",
        github: "https://github.com/Only-Abhiram/Check-Package-MCP-Server"
    },

    {
        serial: 3,
        title: "Talk to CSV",
        description: "Built a full-stack analytics application that allows users to upload CSV files and query their data using natural language. Implemented schema inference and isolated, session-specific SQLite databases, integrating Google's Gemini API to translate user questions into executable SQL queries. Designed a multi-layer SQL security pipeline with keyword deny-listing, single-statement enforcement, read-only execution, and automatic row limits to ensure safe execution of LLM-generated queries.",
        link: "https://talktocsv.abhiram.lol/",
        github: "https://github.com/Only-Abhiram/talktocsv",
        tech: ["React.js", "TypeScript", "Gemini", "Node.js", "SQLite",],
        image: "TalkToCsv.png"
    },
    {
        serial: 4,
        title: "Autoscale",
        description: "Developed an event-driven Instagram automation platform using Next.js, Node.js, MongoDB, and Meta Webhooks to process real-time comment events. Integrated Instagram Graph API and Meta account authorization to enable creators to automate public comment replies and direct messages. Designed a configurable rules engine that evaluates incoming comments against user-defined instructions and triggers appropriate automated responses, reducing manual audience engagement efforts.",
        link: "https://autoscale-nine.vercel.app",
        github: "https://github.com/Only-Abhiram/autoscale",
        tech: ["React", "TypeScript", "Redis"],
        image: "Autoscale.png"
    },
    {
        serial: 5,
        title: "Ask Better",
        description: "Built an AI-powered Chrome extension that transforms vague user inputs into clear, structured, and context-rich prompts using Google's Gemini API. Integrated the Chrome Extensions API to provide seamless prompt refinement across ChatGPT, Gemini, and Claude. Designed to improve prompt quality, reduce repetitive interactions, and help users obtain more relevant AI-generated responses with less manual effort.",
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
