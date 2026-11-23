"use client"
import ProjectsList from '@/lib/components/externals/projectlist'
import LeetCodeHeatmap from '@/lib/components/leetcodeHeatMap'
import Experience from '@/lib/components/experinces'
import MinimalButton from '@/lib/components/minimalButton'
import CodingStats from '@/lib/components/coding'
import ProfileHeader from '@/lib/components/newprofile'
export default function Home() {
  function scrollToSection(section: string) {
    const element = document.getElementById(section);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
 
  return (
    <div >
      <Wrapper >

      </Wrapper>
     

      <div id="home">
        <Wrapper >

        </Wrapper>

      </div>


      {/* home section  */}

      <Wrapper >
        <div className="">
          <ProfileHeader
          />
        </div>

      </Wrapper>




      <div id="work">
        <Wrapper>
        </Wrapper>
      </div>

      {/* work */}

      <Wrapper>
        <div className="text-4xl font-medium ">Experience</div>
      </Wrapper>
      <Wrapper>
     
        <Experience></Experience>
        
        <MinimalButton text={"View All Experiences"} href={"/work"}></MinimalButton>
      </Wrapper>



      <div id="projects">
        <Wrapper>
        </Wrapper>
      </div>

      {/* projects */}

      <Wrapper>
        <div className="text-4xl font-medium ">Projects</div>

      </Wrapper>
      <Wrapper>
        <ProjectsList>
        </ProjectsList>
      </Wrapper>

      <div id="cp">
        <Wrapper>

        </Wrapper>
      </div>


      {/*CP */}
      <Wrapper>
        <div className="text-4xl font-medium ">Competitive Programming</div>


      </Wrapper>


      <Wrapper>
        <LeetCodeHeatmap></LeetCodeHeatmap>
        <CodingStats></CodingStats>
      </Wrapper>




     


      <Wrapper>
      </Wrapper>





    </div>
  );
}
import { useEffect, useRef, useState } from "react";
export function Wrapper({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stripeStyle = {
    backgroundImage:
      "repeating-linear-gradient(-45deg, transparent 0px, transparent 4px, #f1f5f9 4px, #f1f5f9 6px)",
  };

  const hasChildren = Array.isArray(children)
    ? children.some(Boolean)
    : Boolean(children);

  const base =
    "md:transition-all md:duration-700 md:ease-out motion-reduce:transition-none";

  return (
    <div ref={ref} className="w-full flex min-h-12.5 items-stretch">
      {/* Left column (desktop only) */}
      <div
        className={`hidden md:flex md:flex-1 border border-gray-100 ${base} ${visible ? "md:opacity-100 md:translate-x-0" : "md:opacity-0 md:-translate-x-6"
          }`}
        style={hasChildren ? stripeStyle : {}}
      />

      {/* Middle column: always visible on mobile, animated on md+ */}
      <div
        className={`w-full md:w-[55%] flex flex-col justify-center border border-gray-100 p-5 md:delay-150 ${base} ${visible ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-4"
          }`}
        style={{ ...(!hasChildren ? stripeStyle : {}), isolation: "auto" }}
      >
        {children}
      </div>

      {/* Right column (desktop only) */}
      <div
        className={`hidden md:flex md:flex-1 border border-gray-100 ${base} ${visible ? "md:opacity-100 md:translate-x-0" : "md:opacity-0 md:translate-x-6"
          }`}
        style={hasChildren ? stripeStyle : {}}
      />
    </div>
  );
}