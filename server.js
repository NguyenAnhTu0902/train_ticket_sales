const app = require("./src/app");
const { app : { port }} = require("./src/configs/config.db");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

