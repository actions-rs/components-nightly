# `rust-components-nightly` Action

![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)
[![Gitter](https://badges.gitter.im/actions-rs/community.svg)](https://gitter.im/actions-rs/community)

This GitHub Action finds the latest Rust nightly build
with the requested [component](https://rust-lang.github.io/rustup-components-history/) available.

## Background

Ever had the problem when your nightly build breaks because today `nightly`
does not has the `clippy` available? With this Action you can find the most recent
`nightly` build with the clippy available.

Found toolchain name will be set as an [Action output](https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions#steps-context),
ex. `nightly-2019-09-13-x86_64-unknown-linux-gnu`.

Note that this Action does not do anything else with the found toolchain,
you need to install it / set as an override manually, for example,
with a [`actions-rs/toolchain`](https://github.com/actions-rs/toolchain) Action.

## Example workflow

```yaml
on: [push]

name: nightly clippy

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - id: component
        uses: actions-rs/components-nightly@v1
        with:
          component: clippy
      - uses: actions-rs/toolchain@v1
        with:
            toolchain: ${{ steps.component.outputs.toolchain }}
            override: true
```

See [additional recipes here](https://github.com/actions-rs/meta).

## Inputs

* `component` (*required*): Component name to search \
    (see [components list](https://rust-lang.github.io/rustup-components-history/) for available options)
* `target`: Rust target triple (if omitted, default for host will be used, see below)

### Target input

**NOTE**: This feature is not released yet, latest published version (`v1.0.0`)
will fail if `target` input is omitted.

If the `target` input is omitted, default target triple for the current host will be used:

| Virtual environment               | Target triple              |
| --------------------------------- | -------------------------- |
| `windows-latest` / `windows-2019` | `x86_64-pc-windows-msvc`   |
| `windows-2016`                    | `x86_64-pc-windows-msvc`   |
| `ubuntu-latest` / `ubuntu-18.04`  | `x86_64-unknown-linux-gnu` |
| `ubuntu-16.04`                    | `x86_64-unknown-linux-gnu` |
| `macOS-latest` / `macOS-10.14`    | `x86_64-apple-darwin`      |

## Outputs

* `toolchain`: Nightly toolchain name, ex. `nightly-2019-09-13-x86_64-unknown-linux-gnu`
* `command`: Cargo command to call this component
    (might be useful when you need to install `rustfmt` but call the `cargo fmt` then)
