export type GitHubActivity = {
  date: string;
  kind: "commit" | "pull-request";
  repository: string;
  summary: string;
  type: string;
  url: string;
};

export type GitHubContributions = {
  days: Array<{
    date: string;
    level: number;
    label: string;
  }>;
  total: number;
  year: string;
};

type GitHubEvent = {
  created_at: string;
  payload: {
    action?: string;
    head?: string;
    pull_request?: {
      merged_at: string | null;
      number: number;
      title: string;
    };
  };
  repo: {
    name: string;
  };
  type: string;
};

type GitHubCommitResponse = {
  commit: {
    message: string;
  };
  html_url: string;
  sha: string;
};

const githubUsername = "alipnf";
const requestOptions = {
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
  next: { revalidate: 86400 },
};

const contributionRequestOptions = {
  headers: {
    Accept: "text/html",
  },
  next: { revalidate: 86400 },
};

export async function getGitHubContributions(): Promise<GitHubContributions | null> {
  try {
    const response = await fetch(`https://github.com/users/${githubUsername}/contributions`, contributionRequestOptions);

    if (!response.ok) return null;

    const html = await response.text();
    const totalMatch = html.match(/([\d,]+)\s+contributions\s+in\s+(?:the\s+)?(last year|\d{4})/i);
    const days = Array.from(html.matchAll(/<td[^>]*data-date="([^"]+)"[^>]*data-level="([0-4])"[^>]*><\/td>\s*<tool-tip[^>]*>([^<]+)<\/tool-tip>/g)).map((match) => ({
      date: match[1],
      level: Number(match[2]),
      label: match[3].trim(),
    }));

    if (!totalMatch || days.length === 0) return null;

    return {
      days,
      total: Number(totalMatch[1].replaceAll(",", "")),
      year: totalMatch[2].toLowerCase() === "last year" ? "Past year" : totalMatch[2],
    };
  } catch {
    return null;
  }
}

export async function getGitHubActivity(): Promise<GitHubActivity[]> {
  try {
    const eventsResponse = await fetch(`https://api.github.com/users/${githubUsername}/events/public`, requestOptions);

    if (!eventsResponse.ok) return [];

    const events = (await eventsResponse.json()) as GitHubEvent[];
    const pushes = events
      .filter((event) => event.type === "PushEvent" && event.payload.head)
      .filter((event, index, items) => items.findIndex((item) => item.payload.head === event.payload.head) === index)
      .slice(0, 5);

    const commits = await Promise.all(
      pushes.map(async (event) => {
        const response = await fetch(`https://api.github.com/repos/${event.repo.name}/commits/${event.payload.head}`, requestOptions);

        if (!response.ok) return null;

        const commit = (await response.json()) as GitHubCommitResponse;
        return {
          date: event.created_at.slice(0, 10),
          kind: "commit" as const,
          repository: event.repo.name,
          summary: commit.commit.message.split("\n")[0],
          type: commit.sha.slice(0, 7),
          url: commit.html_url,
        };
      }),
    );

    const pullRequests = events
      .filter(
        (event) =>
          event.type === "PullRequestEvent" &&
          event.payload.pull_request &&
          (event.payload.action === "opened" || (event.payload.action === "closed" && event.payload.pull_request.merged_at)),
      )
      .slice(0, 2)
      .map((event) => {
        const pullRequest = event.payload.pull_request!;
        const merged = event.payload.action === "closed" && pullRequest.merged_at;

        return {
          date: event.created_at.slice(0, 10),
          kind: "pull-request" as const,
          repository: event.repo.name,
          summary: pullRequest.title,
          type: merged ? `Merged PR #${pullRequest.number}` : `Opened PR #${pullRequest.number}`,
          url: `https://github.com/${event.repo.name}/pull/${pullRequest.number}`,
        };
      });

    const validCommits: GitHubActivity[] = commits.filter((commit): commit is NonNullable<typeof commit> => commit !== null);

    const recentActivity = [...validCommits.slice(0, 3), ...pullRequests];
    const additionalCommits = validCommits.slice(3, 3 + Math.max(0, 5 - recentActivity.length));

    return [...recentActivity, ...additionalCommits]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5);
  } catch {
    return [];
  }
}
