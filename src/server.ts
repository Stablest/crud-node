import { configDotenv } from "dotenv";
import { app } from "./app";
configDotenv();

const port = process.env.port;

app.listen(port, () => {
  console.log("Server is listening on port ", port);
});
