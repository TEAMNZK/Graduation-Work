# Javaタイピング待機画面

Java選択 → 待機画面 → ゲームスタート → 結果。ほかの言語は従来どおりです。
ランキングはJavaのプレイ記録上位10件（ユーザー別最高記録ではありません）。同点は同順位です。

## Firebase Consoleで必要な設定

アプリ変更では公開済みルールは変わりません。提示済みの既存ルールを維持した完成版です。
ログインユーザーが全員のスコア文書を読めるようになります。文書内のUID・表示名・日時も読めます。usersは本人限定のままです。

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ユーザー情報は本人だけに許可する。
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /typingScores/{scoreId} {
      // 他人のUIDでの記録作成は許可しない。
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;
      // ログインユーザーにランキングの読み取りを許可する。
      allow read: if request.auth != null;
    }
  }
}
```

Firestore Database → インデックス → 複合インデックスを追加：

- コレクションID：`typingScores`
- フィールド：`language` 昇順、`score` 降順
- クエリスコープ：コレクション

作成完了後、待機画面の「再読み込み」を押してください。
インデックス不足時はブラウザの開発者コンソールにも作成リンクが出ます。

## 動作確認

1. ログインして `/typing/java` を開き、待機中はタイマーが動かず、記録も追加されないこと。
2. Javaの記録だけがスコア降順で最大10件表示され、同点が同順位になること。
3. スタート後に120秒からタイマーが減り、入力・終了・保存ができること。
4. 保存後「待機画面へ戻る」で新しい結果がランキングに反映されること。
5. 再スタートは初期状態になり、「もう一度遊ぶ」「言語選択へ戻る」も動くこと。
6. Python・C・JavaScriptは従来どおり直接開始すること。
7. 記録なし・通信エラー・権限不足時もメッセージが出て、スタートはできること。

コミットメッセージ案：`feat: Javaタイピングの待機画面とランキングを追加`
