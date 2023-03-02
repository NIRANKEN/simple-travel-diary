import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import { Handler } from "aws-lambda"

// TODO: あとでanyを変更する
export const middyfy = (handler: Handler) => {
  return middy(handler).use(middyJsonBodyParser())
}
