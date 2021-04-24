import * as path from "https://deno.land/std@0.95.0/path/mod.ts";
import * as fs from "https://deno.land/std@0.95.0/fs/mod.ts";
import { Base64 } from "https://deno.land/x/bb64/mod.ts";
import GitHub from "./GitHub.ts";

const TREE_SEARCH_LIMIT = 100;

export default class Seeker {
  options: {
    q: string;
    sort: string;
    page: number;
    perPage: number;
    filenamePattern: RegExp;
  };
  gh: GitHub;

  constructor(
    token: string,
    options = {
      q: "topic:dotfiles",
      sort: "stars",
      page: 1,
      perPage: 10,
      filenamePattern: /^.*\.?(bashrc|bash_profile|zshrc|zsh_profile)/,
    },
  ) {
    this.options = options;
    this.gh = new GitHub(token);
  }

  async seek() {
    console.info("search dotfiles topic repositories...");
    const start = this.options.perPage * (this.options.page - 1) + 1;
    const end = this.options.perPage * this.options.page;
    console.info(`target: top ${start} to ${end}`);

    const repositories = await this.searchRepository();
    console.info(`repositories: ${repositories.total_count}`);

    let count = 0;
    for (const repository of repositories.items) {
      count += await this.downloadFiles(repository);
    }
    console.info(`saved files: ${count}`);

    console.info("limit rate info:");
    console.info(await this.gh.rateLimit());
  }

  async searchRepository(): Promise<{
    total_count: number;
    items: {
      trees_url: string;
      default_branch: string;
      full_name: string;
    }[];
  }> {
    return await this.gh.search({
      q: this.options.q,
      sort: this.options.sort,
      page: this.options.page,
      per_page: this.options.perPage,
    });
  }

  async downloadFiles(repository: {
    trees_url: string;
    default_branch: string;
    full_name: string;
  }) {
    const params = {
      recursive: 1,
      type: "blob",
      page: 1,
      perPage: TREE_SEARCH_LIMIT,
    };
    const treeData = await this.gh.tree(
      repository.trees_url,
      repository.default_branch,
      params,
    );
    const targets = treeData.tree.filter((item) =>
      this.options.filenamePattern.test(item.path)
    );
    let count = 0;
    for (const target of targets) {
      try {
        await this.download(target, repository.full_name);
        count += 1;
      } catch (err) {
        console.error(err);
      }
    }
    return count;
  }

  async download(
    target: { path: string; url: string },
    repositoryName: string,
  ) {
    const saveFilePath = `files/${repositoryName}/${target.path}`;
    const dir = path.dirname(saveFilePath);
    // mkdir
    await fs.ensureDir(dir);
    const blob = await this.gh.blob(target.url);
    const body = Base64.fromBase64String(blob.content).toString();
    await Deno.writeTextFile(saveFilePath, body);
  }
}
