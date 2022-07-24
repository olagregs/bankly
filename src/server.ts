import express from 'express';

const app = express();

app.use(express.json());

app.get("/user", (request, response) => {
  return response.json("Running..");
});

app.listen(3333, () => console.log("Server is running on port 3333!"));