
import { Wrapper } from '../page'

const experiences = [
    {   serial:1,
        company: "Digital Guruji",
        role: "Full Stack Developer Intern",
        from: "May 2025",
        to: "September 2025",
        description: [
            "Developed 4+ browser-based developer tools using JavaScript, HTML and CSS.",
            "Built reusable and responsive frontend components using Next.js.",
        ],
    }
];


export default function Work() {
    return <div>
        <Wrapper>

        </Wrapper>
        <Wrapper>

        </Wrapper>

        
        <Wrapper ><div className="text-4xl font-medium">Experience</div></Wrapper>
        <Wrapper>
            <Experience></Experience>
        </Wrapper>
        
        <Wrapper>
            
        </Wrapper>


    </div>
}


const Experience = () => {
    
    const sortedExperiences = [...experiences].sort(
        (a, b) => a.serial - b.serial
    );

    return (
        <div className="flex flex-col gap-4">
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
                                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-black underline">
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



