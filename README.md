[![Actions Status](https://github.com/reireias/dotseeker-deno/workflows/main/badge.svg)](https://github.com/reireias/dotseeker-deno/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# dotseeker-deno

[dotseeker](https://github.com/reireias/dotseeker) written by Deno.

Collect dotfile (e.g. `.zshrc`) from GitHub repositories which has dotfiles topic.

## Usage

Set GITHUB_API_TOKEN in `.env` file or environment.

```
GITHUB_API_TOKEN=xxxxxxxxxxxxxxxxx
```

Execute!

```console
deno --allow-env --allow-read index.ts
```

dotseeker downloads dotfile into `files` directory.

```
# example for reireias/dotfile repository
files
└── reireias
    └── dotfiles
        ├── .bashrc
        └── .zshrc
```

## Customize
You can customize this search logic.

TODO
