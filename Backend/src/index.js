import "dotenv/config";
import { app } from "./app.js";

import connectDB from "./db/dbConnection.js";

connectDB()
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running at:- http://localhost:${port} `);
    });
  })
  .catch((error) => {
    console.log("Server Connection Error With Database==>", error);
  });
