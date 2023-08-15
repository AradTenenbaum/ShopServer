import app from "./app";
const serverLog = require("./utils/log");
import CONFIG from "./config";

const PORT = CONFIG.PORT || 3000;

app.listen(PORT, () => {
  serverLog({ message: `Server is listening on port ${PORT}` });
});
