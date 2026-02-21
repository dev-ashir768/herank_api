import app from "./app";
import { config } from "./config";
import logger from "./utils/logger.util";

app.listen(config.PORT, () => {
  logger.info(`Server is running at http://localhost:${config.PORT}`);
});