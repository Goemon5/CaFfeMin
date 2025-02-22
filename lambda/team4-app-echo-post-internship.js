exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  //TODO: 任意の変数に、リクエストボディをJavaScriptオブジェクトに変換した上で代入してください。
  const body = JSON.parse(event.body);
  const name = body.name;

  //TODO: responseオブジェクトのbodyプロパティに↑の変数を文字列に変換した上で代入してください
  response.body = JSON.stringify({ name });

  return response;
};
