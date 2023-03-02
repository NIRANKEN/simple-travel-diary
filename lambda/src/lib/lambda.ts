import middy from "@middy/core"
import { Handler } from "aws-lambda"

// TODO: あとでanyを変更する
export const middyfy = (handler: Handler) => {
  return middy(handler);
}
