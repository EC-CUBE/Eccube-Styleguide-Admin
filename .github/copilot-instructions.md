## 概要

- 日本語でやりとりをお願いします。
- このプロジェクトは2018年までメンテされていましたが、現在はメンテされていません。
- 最新の node v22 で動作することを目指します。
- node v22 で動作しないパッケージは、別のパッケージに代替するか、最新バージョンにマイグレーションします
- nanasess-sc5-styleguide は node v22.14.0 で `npm run test` 及び `npm run demo` が成功し、ブラウザでスタイルガイドの表示を確認済みです。
- run-sequence に依存しないようにしてください
- タスクが完了したら、[.github/prompts](.github/prompts) 以下に `YYYYMMhhmm.md` というファイル名で、プロンプトの履歴を保存してください。

## node.js のバージョン切替

`n` コマンドを利用して、バージョン切替が可能です。

``` shell
sudo n <version>
```

現在は以下のバージョンがインストールされています。

node/6.9.5
node/8.17.0
node/12.22.12
node/14.21.3
node/16.20.2
node/22.14.0

## 参考情報

類似のプロジェクトで node v22 へマイグレーションしたプロンプトの履歴を [.github/prompts/eccube-styleguide-20250422001.md](./prompts/eccube-styleguide-20250422001.md) へ格納しています。こちらも参考にしてください。
