
import React from "react";
import picc from "./me.jpg";
import piccBack from "./me2.jpg";
import { useState, useEffect } from "react";
import ContactModal from "./contactPopup"; 
export default function ProfileHeader({
  name = "Abhiram",
  resumeLink = "https://drive.google.com/file/d/1Fo5_tZgqi9RuGTxteVlp0zdPaPNR1QCx/view?usp=sharing",
  messageLink = "mailto:your@gmail.com",
}) {
  

const socials = [
  {
    name: "GitHub",
    logo: "https://img.icons8.com/?size=100&id=62856&format=png&color=000000",
    href: "https://github.com/only-abhiram",
  },
  {
    name: "LinkedIn",
    logo: "https://img.icons8.com/?size=100&id=13930&format=png&color=000000",
    href: "https://linkedin.com/in/abhiram-palle-bb8b10285/",
  },
  {
    name: "X",
    logo: "https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000",
    href: "https://x.com/yourhandle",
  },
  {
    name:"Gmail",
    logo:"https://img.icons8.com/?size=100&id=qyRpAggnV0zH&format=png&color=000000",
    href:"mailto:abhirampalle06@gmail.com"
  },
  {
    name:"Instagram",
    logo:"https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000",
    href:"https://www.instagram.com/abhiram.speaks"
  },
  
];
  return (
    <section className="w-full ">
      <div
        className="
          relative w-full
        "

      >
        {/* Introduction */}
        <div className="flex flex-row items-center  gap-6 ">

          {/* Flip Profile Image */}
          <div className="group h-32 w-32 sm:h-36 sm:w-36 shrink-0 [perspective:800px]">
            <div className="
              relative h-full w-full
              rounded-full
              transition-transform duration-700
              [transform-style:preserve-3d]
              [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)]
            ">
              <img
                src={picc.src}
                alt={name}
                className="
                  absolute inset-0 h-full w-full
                  rounded-full object-cover
                  border-2 border-[#d4d4d4]
                  [backface-visibility:hidden]
                "
              />

              <img
                src={piccBack.src}
                alt={`${name} alternate`}
                className="
                  absolute inset-0 h-full w-full
                  rounded-full object-cover
                  border-2 border-[#d4d4d4]
                  [backface-visibility:hidden]
                  [transform:rotateY(180deg)]
                "
              />
            </div>
          </div>

          {/* Heading */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="
              text-2xl sm:text-3xl lg:text-[35px]
               tracking-tighter
              leading-tight
         
            ">
              Hi, I'm {name} - a fullstack {<RotatingText />} Developer
            </h1>
          </div>
        </div>

        {/* About */}
        <div className="mt-8 sm:mt-9">
          <p className="
            text-xm
            text-zinc-500 
            leading-relaxed
            max-w-5xl
          ">
            I build full-stack applications and backend systems with {<DashedText text ='Javascript' logo='https://img.icons8.com/?size=100&id=PXTY4q2Sq2lG&format=png&color=000000'  />} , {<DashedText text ='Typescript' logo='https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=000000'/>}, {<DashedText text = 'React' logo = "https://img.icons8.com/?size=100&id=bzf0DqjXFHIW&format=png&color=000000" />}, {<DashedText text = 'Next.js' logo = "https://img.icons8.com/?size=100&id=Y3ZInlfbio5t&format=png&color=000000" />}, {<DashedText text = 'Node.js' logo = "https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000" />}, {<DashedText text = 'Redis' logo = "https://img.icons8.com/?size=100&id=ZGr3TdkIdbkp&format=png&color=000000" />}, and {<DashedText text = 'MongoDB' logo = "https://img.icons8.com/?size=100&id=tBBf3P8HL0vR&format=png&color=000000" />}. Exploring distributed systems, system design, and AI engineering. <span className="text-black">LeetCode Knight (1872)</span> | <span className="text-black">1,350+</span> problems solved | <span className="text-black">GATE</span> CS 2026 Qualified

          </p>
        </div>

{/* Action Buttons */}
<div className="mt-4 flex flex-wrap items-center gap-3 lack">
  <a
    href={process.env.NEXT_PUBLIC_RESUME_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-flex items-center justify-center
     px-3 py-2
      rounded-lg
      border border-[#f1f5f9]
      text-sm font-medium 
      transition-all duration-300
      hover:bg-[#d4d4d4]
      hover:text-[#111111]
    "
   >
    Resume ↗
  </a>

  <ContactModal />
</div>


{/* Social Links */}
<div className="mt-4 flex flex-wrap items-center gap-3">
  {socials.map((social) => (
    <a
      key={social.name}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      title={social.name}
      className="
        group flex items-center justify-center
        w-10 h-10
        rounded-full
        border border-[#d4d4d4]/70
        transition-all duration-300
        hover:bg-[#d4d4d4]
        hover:-translate-y-1
      "
    >
      <img
        src={social.logo}
        alt={social.name}
        className="
          w-5 h-5
        "
      />
    </a>
  ))}
</div>


      </div>
    </section>
  );
}


const words = ["Web", "AI"];


function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block h-[1.2em] overflow-hidden align-bottom">
      <span
        key={index}
        className="inline-block animate-[slideUp_400ms_ease-in-out]"
      >
        {words[index]}
      </span>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
}

function DashedText({ text, color = "text-black", logo }) {
  return (
    <span className="inline-flex items-center gap-1  rounded-md ">
      
      
      <span className={color}>{text}</span>
      {logo && (
        <img
          src={logo}
          alt=""
          className="w-5 h-5 object-contain"
        />
      )}
    </span>
  );
}

