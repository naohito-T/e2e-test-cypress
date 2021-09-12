# 2. ディレクトリ構成

下記の構成を目指す
```sh
.
├── e2e
│　　├── .eslint.js
│　　├── package.json
│　　└── tsconfig.json
│
├── src
│　　└── hoge
│
├── cypress.env.json
├── cypress.json
├── package.json
└── tsconfig.json
```

>テストファイルは root > e2e 配下に配置し、src とは別のディレクトリで管理します ( TypeScript Deep Dive でも推奨されています ) 。理由としては、意図せぬ lint エラーを避けるためです。例えば、Cypress は Mocha の構文を利用しているため、多くのコマンドが Jest と重複します ( describe beforeEach expect など ) 。ディレクトリを分離することで、 lint 時に意図せず Jest の警告が発生することを防ぎます。
