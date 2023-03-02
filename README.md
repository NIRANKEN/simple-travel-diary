# SimpleTravelDiary (template of cdk web app)

AWS CDKを使って構築するNIRANKEN用のWebアプリのテンプレです。

## 一部の手動作業(とても雑な説明)

- cdk-wrapper-sample.shから、必要な変数を入れてcdk-wrapper.shを作成する。
- CognitoClientSecretはAWSSecretsManagerから手動設定する。
- 構築につかうdomainは予め取得しておこう
