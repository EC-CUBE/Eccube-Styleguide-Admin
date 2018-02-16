# EC-CUBE 3 管理画面スタイルガイド制作

EC-CUBE3　管理画面デモサイト　／　ID: admin　パスワード: password

[https://site3.ec-cube.net/admin/](https://site3.ec-cube.net/admin/)

開発リポジトリ

[https://github.com/EC-CUBE/Eccube-Styleguide-Admin](https://github.com/EC-CUBE/Eccube-Styleguide-Admin)

Styleguide On Heorku

[http://eccube3-admin-styleguide.herokuapp.com/styleguide/](http://eccube3-admin-styleguide.herokuapp.com/styleguide/)

HTML Moc On Heroku

[http://eccube3-admin-styleguide.herokuapp.com/](http://eccube3-admin-styleguide.herokuapp.com/)

## コンポーネント設計について

コンポーネント設計及び CSS の記述方針については FLOCSS ルールを採用していきます。
https://github.com/hiloki/flocss

## 詳細度に関する運用

詳細度に関する問題に留意するために、全てのCSS定義は 原則２階層以上遡っての定義を行っては行けないこととします。

## 余白に関する設計

Project レイヤーにおける余白の設計は 原則 margin を用いて設計します。

上下マージンは原則 Bottom で定義します。

Component レイヤーにおける周辺に対する余白は padding を用いて設計します。