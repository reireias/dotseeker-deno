const API_BASE = "https://api.github.com";
const SEARCH_URL = `${API_BASE}/search/repositories`;
const LIMIT_URL = `${API_BASE}/rate_limit`;

export default class GitHub {
  token: string;
  headers: { Authorization: string };

  constructor(token: string) {
    this.token = token;
    this.headers = { Authorization: `token ${this.token}` };
  }

  async search(
    params = {},
  ): Promise<{
    total_count: number;
    items: {
      trees_url: string;
      default_branch: string;
      full_name: string;
    }[];
  }> {
    const headers = {
      Authorization: `token ${this.token}`,
      Accept: "application/vnd.github.mercy-preview+json",
    };
    const query = new URLSearchParams(params);
    const res = await fetch(`${SEARCH_URL}?${query}`, {
      headers,
    });
    return res.json();
  }

  async tree(
    treesUrl: string,
    branch: string,
    params: { recursive: number; type: string; page: number; perPage: number },
  ): Promise<{
    tree: {
      path: string;
      url: string;
    }[];
  }> {
    const url = treesUrl.replace("{/sha}", `/${branch}`);
    const query = new URLSearchParams();
    query.set("recursive", params.recursive.toString());
    query.set("type", params.type);
    query.set("page", params.page.toString());
    query.set("per_page", params.perPage.toString());
    const res = await fetch(`${url}?${query}`, {
      headers: this.headers,
    });
    return res.json();
  }

  async blob(
    url: string,
  ): Promise<{
    content: string;
  }> {
    const res = await fetch(url, { headers: this.headers });
    return res.json();
  }

  async rateLimit() {
    const res = await fetch(LIMIT_URL, { headers: this.headers });
    return res.json();
  }
}
