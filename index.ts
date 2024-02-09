import express, { Express } from "express";
import config from "./src/config/config.json";
import database from "./src/database/mysql.database";
import authRoute from "./src/routes/auth.route";
import sessionRoute from "./src/routes/session.route";
import whatsapp from "./src/services/whatsapp/sessions";

const app: Express = express();
const port = config.PORT;

app.use(express.json());

database.init();
whatsapp.loadSession();
whatsapp.listenChanges();
app.use(express.static("public"));

const api = express.Router();
app.use("/api/v1", api);
api.use("/auth", authRoute);
api.use("/session", sessionRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

whatsapp.startSession("sessionName");
