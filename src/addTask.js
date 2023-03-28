const { v4 } = require("uuid");
const AWS = require("aws-sdk");


const addTask = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  if (typeof event.body === "string"){
    const { title, description } = JSON.parse(event.body)
  }
  else{
    const { title } = JSON.parse(event.body)

  }
  const createdAt = new Date();
  const id = v4();


  const newTask = {
    id,
    title,
    description,
    createdAt,
    done: false
  };

  await dynamodb.put({
      TableName: "TaskTable",
      Item: newTask,
    }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTask),
  };
};

module.exports = {
  addTask
};
