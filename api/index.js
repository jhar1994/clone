const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Places = require("./models/Places");
const Booking = require("./models/Booking");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "awdadedafadfadafaf";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads/"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(
  "mongodb+srv://booking:TA2ffs96ZqQ0EnZK@cluster0.1swqrby.mongodb.net/?retryWrites=true&w=majority"
);

//TA2ffs96ZqQ0EnZK

app.get("/test", (req, res) => {
  res.json("test ok");
});
function getuserDateFromToken(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const UserDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({ UserDoc });
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const UserDoc = await User.findOne({ email });
    if (UserDoc) {
      const passOK = bcrypt.compareSync(password, UserDoc.password);
      if (passOK) {
        {
          jwt.sign(
            { email: UserDoc.email, id: UserDoc.id, name: UserDoc.name },
            jwtSecret,
            {},
            (err, token) => {
              if (err) throw err;
              res
                .cookie("token", token, {
                  sameSite: "none",
                  secure: true,
                  httpOnly: true,
                })
                .json(UserDoc);
            }
          );
        }
      } else {
        res.status(422).json("pass not ok");
      }
    } else {
      res.json("not found.");
    }
  } catch (e) {}
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, id } = await User.findById(userData.id);

      res.json({ name, email, id: id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Sesión cerrada correctamente." });
});

//console.log(__dirname)
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });

  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const timestamp = Date.now();
    const newFileName = `${timestamp}_${i}.${ext}`;
    const newPath = `uploads/${newFileName}`;

    fs.renameSync(path, newPath);
    uploadedFiles.push(newFileName);
  }

  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addPhotos,
    description,
    extraInfo,
    perks,
    checkIn,
    checkOut,
    maxGuest,
    prices,
  } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: "Token inválido" });
    }

    try {
      const placeDoc = await Places.create({
        owner: userData.id,
        title,
        address,
        photos: addPhotos,
        description,
        extraInfo,
        perks,
        checkIn,
        checkOut,
        maxGuest,
        prices,
      });

      res.json(placeDoc);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  });
});

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Places.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Places.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addPhotos,
    description,
    extraInfo,
    perks,
    checkIn,
    checkOut,
    maxGuest,
    prices,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const PlaceDoc = await Places.findById(id);
    if (userData.id === PlaceDoc.owner.toString()) {
      PlaceDoc.set({
        title,
        address,
        photos: addPhotos,
        description,
        extraInfo,
        perks,
        checkIn,
        checkOut,
        maxGuest,
        prices,
      });
      await PlaceDoc.save();
      res.json("Ok");
    }
  });
});
app.get("/places", async (req, res) => {
  res.json(await Places.find());
});

app.post("/bookings", async (req, res) => {
  const userData = await getuserDateFromToken(req);
  const { place, checkIn, checkOut, numberOfGuest, name, mobile, price } =
    req.body;

  try {
    const doc = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuest,
      name,
      mobile,
      price,
      user: userData.id,
    });

    res.json(doc);
  } catch (err) {
    console.error("Error al crear la reserva:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get("/bookings", async (req, res) => {
  const userData = await getuserDateFromToken(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.listen("4000");
