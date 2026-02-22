import { config } from "./config";
import app from "./app";
import logger from "./utils/logger.util";

app.listen(config.PORT, () => {
  logger.info(`Server is running at http://localhost:${config.PORT}`);
});
