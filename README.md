# `components-nightly` Action

This GitHub Action finds the latest Rust nightly build
with the requested [component](https://rust-lang.github.io/rustup-components-history/) available.

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
      - id: components
        uses: actions-rs/components-nightly@master
        with:
          target: x86_64-unknown-linux-gnu
          component: clippy
      - uses: actions-rs/toolchain@master
        with:
            toolchain: ${{ steps.components.toolchain }}
            override: true
```

## Inputs

* `target` (*required*): Rust targe triple
* `component` (*required*): Component name to search \
    (see [components list](https://rust-lang.github.io/rustup-components-history/) for available options)

## Outputs

* `toolchain`: Nightly toolchain name, ex. `nightly-2019-09-13-x86_64-unknown-linux-gnu`
