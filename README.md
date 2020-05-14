# BookReview
 
## 概要
* 本のISBNコードをカメラで読み取り、その本の情報を表示するアプリ

## 目的
* 本屋で本を買う時に　本のレビューを簡単に見れたら嬉しいと思った。
* 本屋で気になる本を探す。　家に帰ってから、アプリを通してweb storeが買う。　という流れを想定。

## 機能
* 本屋で本のisbnを読み取るだけの簡単な操作で本の情報を見ることができる。
* 本をlistに登録しておくことで、家に帰ってから気になった本の購入を吟味できる。
* アプリからrakuten storeを開けるので、気になった本はアプリからrakuten books storeを開いて購入することができる

## 使った技術
* expo
* reactnative (redux)
* firebase
* rakuten books api

## アプリの中身
### ログイン画面
* firebaseを用いて　メールとfacebook loginを実装
![iOS の画像 (4)](https://user-images.githubusercontent.com/43738558/81901628-c7d14f00-95f9-11ea-9b61-7879d97eefa8.png)
### home画面
* rakuten books apiから本のランキングをfetchして表示
* 画面右上のボタンで、表示する本のジャンルを選択できるようにした。
![iOS の画像 (3)](https://user-images.githubusercontent.com/43738558/81901632-c99b1280-95f9-11ea-81fb-b2d68d0be3c3.png)

### book list の画面
* お気に入りの本を記録しておけるリストの画面
* 本をクリックすると本の詳細画面に遷移する。
![iOS の画像 (1)](https://user-images.githubusercontent.com/43738558/81901638-cb64d600-95f9-11ea-905f-a3040d9aa759.png)

### 本の詳細ページ
* isbnをもとにrakuten books apiからfetchした本の情報を表示する.
* addを押すとbook listに追加できる
* open rakuten を押すと、楽天ブックスのサイトに移動でき、webサイトから本を購入することができる。
![iOS の画像 (2)](https://user-images.githubusercontent.com/43738558/81901640-cc960300-95f9-11ea-92bd-7c45215f95c0.png)

### isbnコードの読み取り
* isbnコードをカメラで読み取る。
* 読み取ったコードで、rakuten apiを叩き、本の情報をfetchできる。

![iOS の画像](https://user-images.githubusercontent.com/43738558/81901641-cd2e9980-95f9-11ea-9ed9-f91c2adb50e8.png)

## TODO
* WEB版も作ってみる
 * react
 * booklistのデータはfirestoreを使って cloudに保存してあるため、スマホで保存した本の情報をwebからも見れる。
 * 本屋にてスマホで本を探し、家に帰ってからPCで気になった本を買う流れにしたい。
