require('dotenv').config();
const express = require("express");
const cors = require("cors");
const routes = require('./routes/rutas')
const dbConfig = require("./config/db.config")

const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200
  
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to BuenSabor application." });
});

// routes
app.use(routes);

// set port, listen for requests
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
 
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err&&count==0) {
      new Role({ 
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "employee"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'employee' to roles collection");
      });

      new Role({
        name: "chef"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'chef' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
