
"use client";

import { useEffect, useMemo, useState } from "react";

const DAY = 86400000;

const getLevel = (count) => {
  if (count === 0) return "bg-neutral-100";
  if (count <= 2) return "bg-green-200";
  if (count <= 5) return "bg-green-400";
  if (count <= 9) return "bg-green-600";
  return "bg-green-800";
};

const getDateKey = (date) => date.toISOString().slice(0, 10);

export default function LeetCodeHeatmap() {
  const [calendar, setCalendar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCalendar() {
      try {
        const res = await fetch("/api/leetcode-heatmap", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Unable to fetch LeetCode activity");

        const data = await res.json();
        const raw = data.calendar || {};

        // Normalize both Unix timestamp and YYYY-MM-DD keys.
        const normalized = {};

        Object.entries(raw).forEach(([key, value]) => {
          const timestamp = Number(key);
          const date = /^\d{10,13}$/.test(key)
            ? new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp)
            : new Date(`${key}T00:00:00Z`);

          if (!Number.isNaN(date.getTime())) {
            normalized[getDateKey(date)] = Number(value) || 0;
          }
        });

        setCalendar(normalized);
      } catch (err) {
        console.error(err);
        setError("Could not load LeetCode activity.");
      } finally {
        setLoading(false);
      }
    }

    loadCalendar();
  }, []);

  const { weeks, months, total, activeDays } = useMemo(() => {
    const today = new Date();
    const end = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );

    const start = new Date(end.getTime() - 364 * DAY);
    const gridStart = new Date(start);
    gridStart.setUTCDate(gridStart.getUTCDate() - gridStart.getUTCDay());

    const days = [];
    let total = 0;
    let activeDays = 0;

    for (
      let date = new Date(gridStart);
      date <= end;
      date = new Date(date.getTime() + DAY)
    ) {
      const key = getDateKey(date);
      const count = calendar[key] || 0;
      const inRange = date >= start;

      if (inRange) {
        total += count;
        if (count > 0) activeDays++;
      }

      days.push({ key, count, inRange });
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    const months = [];
    let lastMonth = -1;

    weeks.forEach((week, index) => {
      const first = week.find((day) => {
        const date = new Date(`${day.key}T00:00:00Z`);
        return day.inRange && date.getUTCDate() <= 7;
      });

      if (first) {
        const month = new Date(`${first.key}T00:00:00Z`).getUTCMonth();

        if (month !== lastMonth) {
          months.push({
            index,
            label: new Date(`${first.key}T00:00:00Z`).toLocaleDateString(
              "en",
              { month: "short", timeZone: "UTC" }
            ),
          });
          lastMonth = month;
        }
      }
    });

    return { weeks, months, total, activeDays };
  }, [calendar]);

  return (
    <section className="w-full bg-white text-black ">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <p className="text-xs text-neutral-400 ">
              LeetCode Activity
            </p>
            
          </div>

          <a
            href="https://leetcode.com/u/Abhiram-06/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-500 hover:text-black transition"
          >
            View profile ↗
          </a>
        </div>

        <div className="flex gap-8 sm:gap-12 mb-4">
          <div>
            <p className="text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums">
              {loading ? "..." : total.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-neutral-400 mt-1">Submissions</p>
          </div>

          <div>
            <p className="text-3xl sm:text-4xl font-semibold tracking-tight tabular-nums">
              {loading ? "..." : activeDays}
            </p>
            <p className="text-xs text-neutral-400 mt-1">Active days</p>
          </div>
        </div>

        {error ? (
          <p className="text-sm text-red-500 py-8">{error}</p>
        ) : (
          <div className="w-full overflow-x-auto pb-2">
            <div className="min-w-[620px] sm:min-w-0">

              <div
                className="grid gap-[3px] mb-2"
                style={{
                  gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
                }}
              >
                {weeks.map((_, index) => (
                  <div
                    key={index}
                    className="text-[10px] text-neutral-400"
                  >
                    {months.find((month) => month.index === index)?.label || ""}
                  </div>
                ))}
              </div>

              <div
                className="grid gap-[3px]"
                style={{
                  gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
                }}
              >
                {weeks.map((week, index) => (
                  <div key={index} className="grid grid-rows-7 gap-[3px]">
                    {week.map((day) => (
                      <div
                        key={day.key}
                        title={
                          day.inRange
                            ? `${day.count} submissions on ${day.key}`
                            : ""
                        }
                        className={`
                          aspect-square w-full rounded-[2px]
                          ${day.inRange ? getLevel(day.count) : "bg-transparent"}
                        `}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-5">
          <p className="text-[11px] text-neutral-400">
            {error ? "Activity unavailable" : "Last 365 days"}
          </p>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-neutral-400 mr-1">Less</span>
            {[
              "bg-neutral-100",
              "bg-green-200",
              "bg-green-400",
              "bg-green-600",
              "bg-green-800",
            ].map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded-[2px] ${color}`} />
            ))}
            <span className="text-[10px] text-neutral-400 ml-1">More</span>
          </div>
        </div>

      </div>
    </section>
  );
}
