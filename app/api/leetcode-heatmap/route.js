
const USERNAME = "Abhiram-06";

const query = `
  query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        submissionCalendar
      }
    }
  }
`;

async function getCalendar(year) {
  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${USERNAME}/`,
      cache: "no-store",
    },
    body: JSON.stringify({
      query,
      variables: { username: USERNAME, year },
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("LeetCode request failed");

  const result = await response.json();

  if (result.errors?.length || !result.data?.matchedUser) {
    throw new Error("Unable to fetch LeetCode calendar");
  }

  const calendar =
    result.data.matchedUser.userCalendar?.submissionCalendar;

  return calendar ? JSON.parse(calendar) : {};
}

export async function GET() {
  try {
    const currentYear = new Date().getUTCFullYear();

    const calendars = await Promise.all([
      getCalendar(currentYear - 1),
      getCalendar(currentYear),
    ]);

    const combined = Object.assign({}, ...calendars);

    return Response.json(
      { calendar: combined },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("LeetCode heatmap error:", error);
    return Response.json(
      { error: "Unable to load LeetCode activity" },
      { status: 502 }
    );
  }
}
