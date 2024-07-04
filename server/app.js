import debug from "debug";
import http from "http";
import createHttpError from "http-errors";
import express, { json } from "express";
import { resolve, dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import resolvers from "./graphql/resolvers.js";
import { readFileSync } from "fs";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import { verifyUser } from "./utils/authentication.js";
import { dbUrl } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var debugServer = debug("server:server");
var app = express();

//mogodb connection
mongoose.set("strictQuery", false);
console.log("\nConnecting to the Database...\n");
await mongoose.connect(dbUrl);
console.log("Connected to the Database\n");

// view engine setup
app.set("views", resolve(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(resolve(__dirname, "public")));

var server = http.createServer(app);

const typeDefs = gql(
  readFileSync(resolve(__dirname, "graphql", "schema.graphql"), {
    encoding: "utf-8",
  })
);
const GQLschema = buildSubgraphSchema({ typeDefs, resolvers });

const GQLServer = new ApolloServer({
  schema: GQLschema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: server })],
  introspection: process.env.NODE_ENV !== "production",
});

console.log("Starting the Server...\n");

await GQLServer.start();

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(
  "/graphql",
  cors({origin:["http://localhost:3000"]}),
  json(),
  expressMiddleware(GQLServer, {
    context: async ({ req, res }) => {
      const user = await verifyUser(req, res);
      return { req, res, auth:user };
    },
  })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debugServer("Listening on " + bind);
}

var port = normalizePort(process.env.PORT || "7777");
app.set("port", port);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log("\nStarted HTTP REST API Server at http://localhost:" + port);
console.log("Started HTTP GQL API Server at http://localhost:" + port + "/graphql\n");
