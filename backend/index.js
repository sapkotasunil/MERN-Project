import app from "./app.js";
import dbConnect from "./db/dbConnect.js";
dbConnect().then(() => {
  app.listen(3000, () => console.log("server is Up and runnig"));
});
