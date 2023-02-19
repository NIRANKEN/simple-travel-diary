#!/usr/bin/env node
import { App, Stack, StackProps } from "aws-cdk-lib";
import { SimpleTravelDiaryStack } from "../lib/simple-travel-diary-stack";

class MyStaticSiteStack extends Stack {
  constructor(parent: App, id: string, props: StackProps) {
    super(parent, id, props);

    new SimpleTravelDiaryStack(this, "SimpleTravelDiaryStack", {
      domainName: this.node.tryGetContext("domain"),
      appSubDomain: this.node.tryGetContext("subdomain"),
      googleClientId: this.node.tryGetContext("googleClientId"),
      googleClientSecret: this.node.tryGetContext("googleClientSecret"),
      googleCognitoSecretArn: this.node.tryGetContext("googleCognitoSecretArn"),
    });
  }
}

const app = new App();

new MyStaticSiteStack(app, "MyStaticSite", {
  env: {
    // account: app.node.tryGetContext("accountId"),
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1",
  },
});

app.synth();
