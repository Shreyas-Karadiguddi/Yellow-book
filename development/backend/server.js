import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { swaggerDocs } from "./swaggerSetup.js";
import { router as userRouter } from "./api/users/users.js";
import { router as customerRouter } from "./api/customers/customers.js";

const app = express();
const PORT = process.env.BACKEND_PORT;

app.use(express.json());
app.use(cors());
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/users", userRouter);
app.use("/api/customers", customerRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
