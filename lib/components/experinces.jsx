
import React from "react";

const experiences = [
    {   serial:1,
        company: "Digital Guruji",
        role: "Full Stack Developer Intern",
        from: "May 2025",
        to: "September 2025",
        description: [
            "Developed 4+ browser-based developer utilities including Base64 Encoder/Decoder, SHA-256/SHA-512 Hash Generator, HTML/CSS/JS Minifiers, and JSON Viewer using JavaScript, HTML, CSS, and Tailwind CSS.",
            "Implemented API-independent client-side processing workflows for encoding, hashing, and minification, enabling efficient execution without server-side processing or backend dependencies.",
        ],
    }
];

const Experience = () => {
    
    const sortedExperiences = [...experiences].sort(
        (a, b) => a.serial - b.serial
    );

    return (
        <div className="flex flex-col gap-4 mb-5">
            {sortedExperiences.map((exp) => {
                const isCurrent = exp.to?.toLowerCase() === "current";

                const dates = [
                    exp.from,
                    isCurrent ? "Present" : exp.to,
                ]
                    .filter(Boolean)
                    .join(" — ");

                return (
                    <div key={exp.serial} className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-black underline">
                                    {exp.company}
                                </h3>
                                <p className="text-lg sm:text-xl text-zinc-500 ">
                                    {exp.role}
                                </p>
                            </div>

                            {dates && (
                                <div className="flex items-center gap-2 text-sm  sm:pt-2">
                                    {dates}

                                    {isCurrent && (
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {exp.description?.length > 0 && (
                            <ul className="flex flex-col gap-1 pl-1">
                                {exp.description.map((point, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 text-xm  text-zinc-500 leading-relaxed"
                                    >
                                        <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
    );
};



export default Experience;
