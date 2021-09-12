# 1. 構築手順

`$ npx create-react-app e2e-test-cypress --template typescript`


`$ yarn add -D cypress @cypress/instrument-cra cross-env`

>Windows 環境で実行できるように、cross-env を指定しています
>cypress コマンド実行時に NODE_PATH=src を指定することで、テストディレクトリから src 配下のモジュールを絶対パスでインポートできるようになります。

```json
"scripts": {
  "start": "react-scripts -r @cypress/instrument-cra start",
  "cy:open": "cross-env NODE_PATH=src cypress open",
  "cy:run": "cross-env NODE_PATH=src cypress run --headless"
}
```

- 立ち上げる
yarn start後、cypressを起動

```sh
$ yarn start

$ yarn cy:open
```

自動でファイルが作成される。

- cypress.jsonを編集

```json
{
  "baseUrl": "http://localhost:3000",
  "fileServerFolder": "cypress",
  "fixturesFolder": "cypress/fixtures",
  "integrationFolder": "cypress/integration",
  "screenshotsFolder": "cypress/screenshots",
  "videosFolder": "cypress/videos",
  "supportFile": "cypress/support/index.ts",
  "pluginsFile": "cypress/plugins/index.ts",
  "testFiles": "**/*.spec.ts"
}
```

- テストコードをTypeScriptで動かせるようにする.

>テストコードの拡張子は .js になっていますが .ts として扱えるようにします。
>e2e ディレクトリに移動します。integration/examples ディレクトリは削除し、package.json を作成します。

## 参考

[参考URL](https://www.gixo.jp/blog/16086/)
[gitbook](https://r-ngtm.hatenablog.com/entry/2020/06/18/193235)
