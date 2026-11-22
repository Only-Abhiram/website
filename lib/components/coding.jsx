
"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

const platforms = [
  {
    id: "leetcode",
    name: "LeetCode",
    username: "Abhiram-06",
    url: "https://leetcode.com/u/Abhiram-06/",
  },
  {
    id: "gfg",
    name: "GeeksforGeeks",
    username: "abhiram_06",
    url: "https://www.geeksforgeeks.org/user/abhiram_06/",
  },
  {
    id: "codechef",
    name: "CodeChef",
    username: "am_abhiram",
    url: "https://www.codechef.com/users/am_abhiram",
  },
  {
    id: "codeforces",
    name: "Codeforces",
    username: "Abhiram_Palle",
    url: "https://codeforces.com/profile/Abhiram_Palle",
  },
];

const formatNumber = (value) =>
  value == null ? "—" : Number(value).toLocaleString("en-IN");

export default function CodingStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/coding-stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full bg-white text-black py-5 ">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">


        {/* Total */}
        <div className="mb-12">
          <div className="flex items-baseline gap-3 mt-1">
            <h3 className="text-6xl sm:text-7xl font-semibold tracking-tight tabular-nums">
              {loading ? "..." : formatNumber(stats?.totalSolved)}+
            </h3>
            <span className="text-md text-neutral-400">problems solved</span>
          </div>
        </div>

        {/* Platforms */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-9">
          {platforms.map((platform) => {
            const data = stats?.platforms?.[platform.id];
            const available = data?.status === "success";

            return (
              <div key={platform.id} className="min-w-0  p-2 border-2 border-[#f1f5f9]">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium truncate">
                    {platform.name}
                  </p>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${platform.name}`}
                    className="text-neutral-400 hover:text-black transition-colors shrink-0"
                  >
                    <ExternalLink size={13} />
                  </a>
                </div>

                <p className="text-xs text-neutral-400 truncate">
                  @{platform.username}
                </p>

                <p className="text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums mt-4">
                  {loading
                    ? "..."
                    : available
                      ? formatNumber(data.totalSolved)
                      : "—"}
                </p>

                <p className="text-xs text-neutral-400 mt-1">
                  Problems solved
                </p>

                {available && (
                  <div className="mt-4 space-y-2">
                    {platform.id === "leetcode" &&
                      ["easy", "medium", "hard"].map((level) => (
                        <div
                          key={level}
                          className="flex justify-between gap-2 text-xs"
                        >
                          <span className="text-neutral-400 capitalize">
                            {level}
                          </span>
                          <span className="tabular-nums">
                            {formatNumber(data[level])}
                          </span>
                        </div>
                      ))}

                    {(platform.id === "codechef" ||
                      platform.id === "codeforces") && (
                      <>
                        <div className="flex justify-between gap-2 text-xs">
                          <span className="text-neutral-400">Rating</span>
                          <span className="tabular-nums">
                            {formatNumber(data.currentRating)}
                          </span>
                        </div>
                        <div className="flex justify-between gap-2 text-xs">
                          <span className="text-neutral-400">Max rating</span>
                          <span className="tabular-nums">
                            {formatNumber(data.maxRating)}
                          </span>
                        </div>
                      </>
                    )}

                    {platform.id === "gfg" && (
                      <div className="flex justify-between gap-2 text-xs">
                        <span className="text-neutral-400">Acceptance</span>
                        <span className="tabular-nums">
                          {data.acceptanceRate != null
                            ? `${data.acceptanceRate}%`
                            : "—"}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Updated */}
        <p className="text-[11px] text-neutral-400 mt-10">
          {stats?.updatedAt
            ? `Last updated ${new Date(stats.updatedAt).toLocaleDateString()}`
            : "Coding statistics"}
        </p>

      </div>
    </section>
  );
}
