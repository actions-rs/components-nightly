# `rust-components-nightly` Action

![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)
[![Gitter](https://badges.gitter.im/actions-rs/community.svg)](https://gitter.im/actions-rs/community)

This GitHub Action finds the latest Rust nightly build
with the requested [component](https://rust-lang.github.io/rustup-components-history/) available.

## Deprecation notice

Since [`actions-rs/toolchain`](https://github.com/actions-rs/toolchain#components)
Action is now utilizes `rustup` ability to find the most recent `nightly` build
with **multiple** components available, this Action is deprecated now.\
Consider removing it from your workflows and use [`actions-rs/toolchain`](https://github.com/actions-rs/toolchain) directly.

For example, instead of

```yaml
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

you can now tune `actions-rs/toolchain` action:

```yaml
steps:
  - uses: actions/checkout@master
  - uses: actions-rs/toolchain@v1
    with:
        toolchain: nightly
        components: clippy
        override: true
```

See [Components](https://github.com/actions-rs/toolchain#components) section for more.

This Action will not be updated anymore, but will be leaved as is
in order not to break workflows, which are using it already.

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

| Name        | Required | Description                                                                            | Type   | Default          |
| ------------| :------: | ---------------------------------------------------------------------------------------| ------ | -----------------|
| `component` | ✓        | [Component](https://rust-lang.github.io/rustup-components-history/) name to search for | string |                  |
| `target`    |          | Rust target triple (see [Target input](#target-input) section below)                   | string | *host-dependant* |

### Target input

If the `target` input is omitted, default target triple for the current host will be used:

| Virtual environment               | Target triple              |
| --------------------------------- | -------------------------- |
| `windows-latest` / `windows-2019` | `x86_64-pc-windows-msvc`   |
| `windows-2016`                    | `x86_64-pc-windows-msvc`   |
| `ubuntu-latest` / `ubuntu-18.04`  | `x86_64-unknown-linux-gnu` |
| `ubuntu-16.04`                    | `x86_64-unknown-linux-gnu` |
| `macOS-latest` / `macOS-10.14`    | `x86_64-apple-darwin`      |

## Outputs

| Name        | Description                                                                                                                 | Type   |
| ------------| ----------------------------------------------------------------------------------------------------------------------------| ------ |
| `toolchain` | Most recent nightly toolchain name with the requested component available,ex. `nightly-2019-09-13-x86_64-unknown-linux-gnu` | string |
| `command`   | Cargo command to call this component (might be useful when you need to install `rustfmt` but call the `cargo fmt` then)     | string |
