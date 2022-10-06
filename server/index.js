const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const messageRoute = require("./routes/messages");
const conversationRoute = require("./routes/conversations");
const cors = require("cors")
const multer = require("multer")
const path = require("path")

dotenv.config();

const mongooseDbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true
        })
        console.log('MongoDb::: connected!!')
    } catch (error) {
        console.log(`MongoDB::: Failed to connect!! - ${error.message}`)
        throw new Error(`MongoDB::: Failed to connect!!`)
    }
}
mongooseDbConnect()

//middleware
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/images", express.static(path.join(__dirname, "public/images")));


// upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})
const upload = multer({ storage })
app.post('/api/upload', upload.single("file"), (req, res) => {
    try {
        return res.status(200).json({ message: "upload success" })
    } catch (error) {
        console.log(error)
    }
})

// routes
app.get('/', (req, res, next) => {
    res.json({
        adu: "adu"
    })
})
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(8800, () => {
    console.log("Server is running! http://localhost:8800/");
});