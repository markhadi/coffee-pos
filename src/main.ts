import { logger } from "./apps/logging";
import { httpServer } from "./apps/web";

const port = process.env.PORT;

httpServer.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
