# monaco-editor-core-full

> This is a **full-browser build** of the Monaco Editor core, forked from
> [microsoft/vscode](https://github.com/microsoft/vscode) at commit
> [`86f5a62f058`](https://github.com/microsoft/vscode/commit/86f5a62f058e3905f74a9fa65d04b2f3b533408e)
> (VS Code v1.96, 2025-11-18) and maintained at
> [xiezhongfu/vscode · made-editor](https://github.com/xiezhongfu/vscode/tree/made-editor).

## What is this package?

`monaco-editor-core-full` is a superset of the official
[monaco-editor-core](https://www.npmjs.com/package/monaco-editor-core) package.
It ships **all browser-side APIs** intact — nothing is tree-shaken away.

The official `monaco-editor-core` applies aggressive tree-shaking (shake level 2, ClassMembers),
which removes browser UI utilities that are not reachable from the standard editor entry points,
such as `vs/base/browser/ui/**` and most of `vs/platform/*/browser/**`.
This package retains all of those modules.

## Why does this package exist?

When building custom editor surfaces that need to reuse Monaco's internal browser
utilities (e.g. `vs/base/browser/ui/list`, `vs/base/browser/ui/tree`,
`vs/platform/contextview/browser`, etc.) directly — without bundling them separately —
the official package simply does not include them.

This package solves that by using a **Files-level tree-shaking** (shake level 0):
every source file that is reachable from the entry points is kept in full,
so all browser APIs are available for import at runtime.

## Customisations over upstream

The following changes were made on top of the base commit (`86f5a62f058`):

| Commit | Description |
|--------|-------------|
| `7c1f780` | Added `editor-distro-full` gulp task: new entry-point recipe (`monaco-full.usage.recipe`), shake level 0, outputs to `out-monaco-editor-core-full/` |
| `168d2d4` | Added pre-built `monaco-editor-core-full/` artefact directory (committed build output for direct consumption) |
| `062386e` | Renamed package to `monaco-editor-core-full` |
| `ded072c` | Version bump to align with release cadence |

All changes are scoped to the build tooling (`build/gulpfile.editor.js`,
`build/lib/standalone.ts`, `build/monaco/monaco-full.usage.recipe`) and
the `monaco-editor-core-full/` output directory.
No editor source code under `src/` has been modified.

## License

[MIT](https://github.com/xiezhongfu/vscode/blob/made-editor/LICENSE.txt)
