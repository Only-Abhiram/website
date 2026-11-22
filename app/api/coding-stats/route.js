
const USERNAMES = {
    leetcode: "Abhiram-06",
    gfg: "abhiram_06",
    codechef: "am_abhiram",
    codeforces: "Abhiram_Palle",
  };
  
  async function getJSON(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 3600 },
      cache: "no-store",
    });
  
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
  
    return response.json();
  }
  
  // LEETCODE
  async function getLeetCodeStats() {
    const query = `
      query userStats($username: String!) {
        matchedUser(username: $username) {
          profile {
            ranking
          }
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;
  
    const response = await getJSON(
      "https://leetcode.com/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referer": "https://leetcode.com",
        },
        body: JSON.stringify({
          query,
          variables: {
            username: USERNAMES.leetcode,
          },
        }),
      }
    );
  
    const user = response.data?.matchedUser;
    
    if (!user) throw new Error("LeetCode profile not found");
  
    const counts = user.submitStats.acSubmissionNum;
    
    return {
      username: USERNAMES.leetcode,
      totalSolved:
        counts.find(x => x.difficulty === "All")?.count || 0,
      easy:
        counts.find(x => x.difficulty === "Easy")?.count || 0,
      medium:
        counts.find(x => x.difficulty === "Medium")?.count || 0,
      hard:
        counts.find(x => x.difficulty === "Hard")?.count || 0,
      ranking: user.profile?.ranking || null,
    };
  }
  
  // GEEKSFORGEEKS
  async function getGFGStats() {
    const response = await getJSON(
      `https://gfg-stats.tashif.codes/${USERNAMES.gfg}/stats`
    );
  
    const data = response.data;
  
    if (response.status !== "success" || !data) {
      throw new Error("GFG stats unavailable");
    }
  
    return {
      username: USERNAMES.gfg,
      totalSolved: data.totalSolved ?? 0,
      easy: data.byDifficulty?.easy ?? null,
      medium: data.byDifficulty?.medium ?? null,
      hard: data.byDifficulty?.hard ?? null,
      acceptanceRate: data.acceptanceRate ?? null,
    };
  }
  
  // CODECHEF
  async function getCodeChefStats() {
    const [statsResponse, ratingResponse] = await Promise.all([
      getJSON(
        `https://codechef-stats.tashif.codes/${USERNAMES.codechef}/stats`
      ),
      getJSON(
        `https://codechef-stats.tashif.codes/${USERNAMES.codechef}/rating`
      ),
    ]);
  
    const stats = statsResponse.data;
    const rating = ratingResponse.data;
  
    if (!stats || statsResponse.status !== "success") {
      throw new Error("CodeChef stats unavailable");
    }
  
    return {
      username: USERNAMES.codechef,
      totalSolved: stats.totalSolved ?? null,
      currentRating: rating?.current ?? null,
      maxRating: rating?.max ?? null,
    };
  }
  
  // CODEFORCES
  async function getCodeforcesStats() {
    // Codeforces allows at most one API call every two seconds.
    const userResponse = await getJSON(
      `https://codeforces.com/api/user.info?handles=${USERNAMES.codeforces}`
    );
  
    if (userResponse.status !== "OK") {
      throw new Error("Codeforces user not found");
    }
  
    await new Promise(resolve => setTimeout(resolve, 2100));
  
    const submissionsResponse = await getJSON(
      `https://codeforces.com/api/user.status?handle=${USERNAMES.codeforces}&from=1&count=10000`
    );
  
    if (submissionsResponse.status !== "OK") {
      throw new Error("Codeforces submissions unavailable");
    }
  
    const user = userResponse.result[0];
  
    const solved = new Set();
  
    for (const submission of submissionsResponse.result) {
      if (submission.verdict === "OK") {
        const problem = submission.problem;
  
        solved.add(
          `${problem.contestId ?? "gym"}-${problem.index ?? problem.name}`
        );
      }
    }
  
    return {
      username: USERNAMES.codeforces,
      totalSolved: solved.size,
      currentRating: user.rating ?? null,
      maxRating: user.maxRating ?? null,
      rank: user.rank ?? null,
    };
  }
  
  // MAIN API
  export async function GET() {
    const platforms = [
      ["leetcode", getLeetCodeStats],
      ["gfg", getGFGStats],
      ["codechef", getCodeChefStats],
      ["codeforces", getCodeforcesStats],
    ];
  
    const results = await Promise.allSettled(
      platforms.map(async ([name, fetchStats]) => ({
        name,
        data: await fetchStats(),
      }))
    );
  
    const stats = {};
  
    results.forEach((result, index) => {
      const name = platforms[index][0];
  
      if (result.status === "fulfilled") {
        stats[name] = {
          status: "success",
          ...result.value.data,
        };
      } else {
        console.error(`${name} stats error:`, result.reason);
  
        stats[name] = {
          status: "error",
          username: USERNAMES[name],
          totalSolved: null,
        };
      }
    });
  
    const totalSolved = Object.values(stats).reduce(
      (total, platform) =>
        total + (platform.totalSolved ?? 0),
      0
    );
  
    return Response.json({
      totalSolved,
      platforms: stats,
      updatedAt: new Date().toISOString(),
    });
  }
  