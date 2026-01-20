## ECCUBE Dashboard Styleguide

最新の開発情報はこちら(後Readmeに移行)

https://chatboxinc.backlog.jp/alias/wiki/220525

## Usage

moc
````
$ npm i
$ npm run dev
````

スタイルガイド

```
$ npm run dev:sg
```
または
```
$ gulp dev:sg
```
http://localhost:4000/で確認可能

## スタイルガイドのビルド

```
$ npm run build
```

### appRootの設定

スタイルガイドのベースURLを環境変数 `APP_ROOT` で指定できます。

```
$ APP_ROOT="/custom/path/" npm run build
```

デフォルト値は `/styleguide/` です。