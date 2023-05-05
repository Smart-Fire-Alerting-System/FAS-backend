import userRouter from "./userRoutes.js";
import dataRouter from "./dataRoutes.js";
import { swaggerSpec } from "../docs/swagger.js";
import swaggerUi from "swagger-ui-express";

const route = (app) => {
    app.use("/api/user", userRouter);
    app.use("/api/data", dataRouter)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
};

export default route;