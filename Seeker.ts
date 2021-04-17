export class Seeker {
  options: {
    q: string;
    sort: string;
    page: number;
    perPage: number;
    filenamePattern: RegExp;
  };

  constructor(options = {
    q: "topic:dotfiles",
    sort: "stars",
    page: 1,
    perPage: 10,
    filenamePattern: /^.*\.?(bashrc|bash_profile|zshrc|zsh_profile)/,
  }) {
    this.options = options;
  }
}
