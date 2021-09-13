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

```sh
cypressディレクトリに移動する。
$ pwd
/Users/tanakanaohitoshi/work/product/e2e-test-cypress/e2e-test-cypress/cypress

package.jsonを作成する。
$ npm init -y

$ yarn add typescript

$ yarn add -D cypress @testing-library/cypress eslint-plugin-cypress eslint @typescript-eslint/eslint-plugin
@typescript-eslint/parser prettier eslint-config-prettier eslint-plugin-prettier
```

- eslintを効かせる

```sh
$ touch .eslintrc.js
```

作成する

```js
module.exports = {
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'cypress'],
  root: true,
};
```

- cypress配下のjsファイルをtsに全て変更する。

とりあえずintegration内の2つのディレクトリ内のjsをtsに変更してみた。
→これは失敗。そしてsampleファイルは長いため削除する。

sample.spec.tsを作成してそれだけを実行する。
```ts
describe('Check text', () => {
  it('check text', () => {
    cy.visit('http://localhost:3000');

    // code タグ内にテキストが存在することを確認する
    cy.contains('code', 'src/App.tsx');
  });
});
```

```sh
$ yarn start
$ yarn cy:run
```

成功した。

- スナップショットを導入する

>UI が変わらないことを確かめる際は、スナップショットテストを導入すると良いでしょう。e2e 配下で、必要なライブラリをインストールします。

cypress配下で以下をinstallする

`$ cd e2e-test-cypress/cypress`

`$ yarn add -D @types/cypress-image-snapshot cypress-image-snapshot`

e2e/plugin/index.ts を下記のように変更する。

```ts
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';

// const snap = (on: Cypress.PluginEvents,
//               config: Cypress.PluginConfigOptions): Cypress.PluginConfigOptions => {

// }

/**
 * @type {Cypress.PluginConfig}
 */
export default function (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Cypress.PluginConfigOptions {
  addMatchImageSnapshotPlugin(on, config);

  return config;
}
```

Cypressが名前空間が見つかれないと言われている。


e2e/support/commands.ts を下記のように変更する。

```ts
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();
```

rootディレクトリのpackage.jsonを変更

```json
 "start": "react-scripts -r @cypress/instrument-cra start",
  "cy:open": "cross-env NODE_PATH=src cypress open --env failOnSnapshotDiff=false",
  "cy:run": "cross-env NODE_PATH=src cypress run --headless --env failOnSnapshotDiff=false",
  "cy:snap": "cross-env NODE_PATH=src cypress run --headless",
  "cy:snap:update": "cross-env NODE_PATH=src cypress run --headless --env updateSnapshots=true"
```

実行できた。スナップショットが作成された。
次は色を変える。

色を変えてスナップショットを取るとpassされない。
差分のdiffがスナップショット取られる

- テストカバレッジを取得する

rootディレクトリにてライブラリを追加する
`$ yarn add -D nyc @cypress/code-coverage`

rootディレクトリのpackage.jsonに追記

```json
"nyc": {
  "report-dir": "e2e/coverage",
  "reporter": [ "text", "lcov" ]
}
```

e2e/plugins/intex.ts を下記のように変更します。


## 参考

[参考URL](https://www.gixo.jp/blog/16086/)
[gitbook](https://r-ngtm.hatenablog.com/entry/2020/06/18/193235)
