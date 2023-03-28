const uuid = require("uuid");
const AWS = require("aws-sdk");


updateTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const { done, title, description } = JSON.parse(event.body);

  await dynamodb
    .update({
      TableName: "TaskTable",
      Key: { id },
      UpdateExpression: "set done = :done, title=:title, description= :description",
      ExpressionAttributeValues: {
        ":done": done,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "task updated",
    }),
  };
};

module.exports = {
  updateTask,
};

