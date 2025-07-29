# 学んだこと

## なぜ、tsconfig.paths.json は、references ではなく extends に書く？

tsconfig.paths.json はアプリ全体で使用したいルールになるので、extends を利用して各設定ファイルに継承させる。
tsconfig.app.json や tsconfig.node.json はアプリ全体ではなく、react や node/vite のみの設定なので、references で参照するようにする。

## eslint-plugin-import について

eslint-plugin-import を用いて、import の順番などを eslint で厳格にルール決めできる。

groupPaths とは？
パスのエイリアスなどを使用する際に、デフォルトではうまく整理されないため、groupPaths にどのパスをどの順番の位置にするかを指定できる。

```example
pathGroups: [
  {
    pattern: '@components/**',
    group: 'internal',
    position: 'after',
  },
  {
    pattern: '@utils/**',
    group: 'internal',
    position: 'after',
  }
],

```

## "external" を pathGroupsExcludedImportTypes からなぜ外す？
