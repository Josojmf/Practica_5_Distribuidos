const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const NTP = require("ntp-time").Client;
const client = new NTP("a.st1.ntp.br", 123, { timeout: 5000 });
const MongoClient = require("mongodb").MongoClient;

async function sync() {
  try {
    const timeNTP = await client.syncTime();
    io.emit(
      "chat message",
      "NTP Server sync time:" + JSON.stringify(timeNTP.time)
    );
    return JSON.stringify(timeNTP.time);
  } catch (error) {
    console.error("ERROR-------------------------", error);
    io.emit("chat message", "");
  }
}
 async function fetchDBmessages() {
  const dbName = "Practica5Distribuidos";
  const collectionName = "chat";
  const uri =
    "mongodb+srv://josojmf:yk6zucBZhK9CGsRT@practica5distribuidos.ryqbuhp.mongodb.net/?retryWrites=true&w=majority&appName=Practica5Distribuidos";
  const mongoclient = new MongoClient(uri);
  const cli =await mongoclient.connect()
  const database = cli.db(dbName);
  const collection = database.collection(collectionName);
  const messages = await collection.find().limit(5).sort({ time: -1 }).toArray();
  mongoclient.connect().then(() => {
    const database = mongoclient.db(dbName);
    const collection = database.collection(collectionName);
    collection
      .find()
      .limit(5)
      .sort({ time: -1 })
      .toArray()
      .then((messages) => {
        messages.forEach((message) => {
          if (message.message){
          io.emit("chat message", message. message + " On: " + message.time);
          } else {
            io.emit("chat message", "Loading...");
          }
        });
      })
  });
}

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/history", (_req, res) => {
  fetchDBmessages();
  res.sendFile(__dirname + "/history.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    const message = { message: msg, time: new Date() };
    const dbName = "Practica5Distribuidos";
    const collectionName = "chat";
    const uri =
      "mongodb+srv://josojmf:yk6zucBZhK9CGsRT@practica5distribuidos.ryqbuhp.mongodb.net/?retryWrites=true&w=majority&appName=Practica5Distribuidos";
    const mongoclient = new MongoClient(uri);
    mongoclient.connect().then(() => {
      const database = mongoclient.db(dbName);
      const collection = database.collection(collectionName);
      collection.insertOne(message).then(() => {
        io.emit("chat message", msg);
      });
    });
    const _ntpRes = sync().then((time) => {
      return time;
    });

    const timeAPIURL = "http://worldtimeapi.org/api/timezone/Europe/Madrid";
    const _apiRes = fetch(timeAPIURL)
      .then((response) => response.json())
      .then(
        (data) =>
          io.emit(
            "chat message",
            "API Server sync time:" + new Date(data.datetime)
          ),
        io.emit("chat message", "Local time:" + new Date())
      );
  });
});

http.listen(port, () => {
  

  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
