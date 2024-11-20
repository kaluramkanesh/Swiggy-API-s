require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const PORT = process.env.PORT || 3000
const mongodb_url = process.env.MONGODB_URL || 'mongodb+srv://thinkinternet2020:FlrUonevplMlfTXx@cluster0.bgydh5k.mongodb.net/ludobattle'

const app = express()
// Enable CORS
app.use(cors({
    origin: '*', // Allow all origins (use specific origins in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use(bodyParser.json())


// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "images")));

// Multer configuration for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "images");
        cb(null, uploadPath); // Save images to the "uploads" folder
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); // Use a unique name for the uploaded file
    }
});

const upload = multer({ storage: storage });
mongoose.connect(mongodb_url, {

}).then(() => { console.log("mongodb is connected") })
    .catch((error) => { console.log(error) })

app.post("/image/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const fileUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        res.status(200).json({ message: "Image uploaded successfully", fileUrl });
    } catch (error) {
        return res.status(500).json({ status: false, message: `Error ${error.message}` })
    }
})

app.get("/images/get", async (req, res) => {
    try {
        const uploadPath = path.join(__dirname, "images"); // Path to the uploads directory

        // Read all files from the uploads directory
        fs.readdir(uploadPath, (err, files) => {
            if (err) {
                return res.status(500).json({ status: false, message: `Error reading files: ${err.message}` });
            }

            // Generate objects with file name and URL
            const fileUrls = files.map(file => ({
                name: file, // File name
                images: `${req.protocol}://${req.get("host")}/uploads/${file}` // File URL
            }));
            // Respond with the list of file URLs
            // return res.status(200).json({ status: true, images: fileUrls });
            return res.status(200).send(fileUrls)
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: `Error ${error.message}` })
    }
})

app.get("/image/logo", async (req, res) => {
    try {
        const uploadPath = path.join(__dirname, "logo"); // Path to the uploads directory

        // Read all files from the uploads directory
        fs.readdir(uploadPath, (err, files) => {
            if (err) {
                return res.status(500).json({ status: false, message: `Error reading files: ${err.message}` });
            }

            // Generate objects with file name and URL
            const fileUrls = files.map(file => ({
                name: file, // File name
                images: `${req.protocol}://${req.get("host")}/uploads/${file}` // File URL
            }));
            // Respond with the list of file URLs
            // return res.status(200).json({ status: true, images: fileUrls });
            return res.status(200).send(fileUrls)
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: `Error ${error.message}` })
    }
})
app.get("/images/get/restaurent", async (req, res) => {
    try {
        const arr = [
            {
                "image": "North_Indian_4.jpeg",
                "path": "north-indian"
            },
            {
                "image": "Pizza.jpeg",
                "path": "pizza"
            },
            {
                "image": "Noodles.jpeg",
                "path": "noodles"
            },
            {
                "image": "Pasta.jpeg",
                "path": "pasta"
            },
            {
                "image": "Paratha.jpeg",
                "path": "paratha"
            },
            {
                "image": "Biryani_2.jpeg",
                "path": "biryani"
            },
            {
                "image": "Burger.jpeg",
                "path": "burger"
            },
            {
                "image": "Cakes.jpeg",
                "path": "cakes"
            },
            {
                "image": "Chinese.jpeg",
                "path": "chinese"
            },
            {
                "image": "Chole_Bature.jpeg",
                "path": "chole-bature"
            },
            {
                "image": "Dosa.jpeg",
                "path": "dost"
            },
            {
                "image": "Gulab_Jamun.jpeg",
                "path": "gulab-jamun"
            },
            {
                "image": "Ice_Creams.jpeg",
                "path": "ice-creams"
            },
            {
                "image": "Idli.jpeg",
                "path": "idli"
            },
            {
                "image": "Khichdi.jpeg",
                "path": "khichdi"
            },
            {
                "image": "Poori.jpeg",
                "path": "poori"
            },
            {
                "image": "Pure_Veg.jpeg",
                "path": "pure-veg"
            },
            {
                "image": "Rolls.jpeg",
                "path": "rolls"
            },
            {
                "image": "Salad.jpeg",
                "path": "salad"
            },
            {
                "image": "South_Indian_4.jpeg",
                "path": "south-indian"
            }
        ]
        const uploadPath = path.join(__dirname, "images"); // Path to the uploads directory
        fs.readdir(uploadPath, (err, files) => {
            if (err) {
                return res.status(500).json({ status: false, message: `Error reading files: ${err.message}` });
            }

            // Map over the restaurant array and match images
            const updatedArr = arr.map(restaurant => {
                const matchingImage = files.find(file => file === restaurant.image);
                return {
                    ...restaurant,
                    image: matchingImage
                        ? `${req.protocol}://${req.get("host")}/uploads/${matchingImage}` // Construct full URL for matched image
                        : null // If no matching image is found, set it to null
                };
            });

            // Respond with the list of file URLs
            // return res.status(200).json({ status: true, images: fileUrls });
            return res.status(200).send(updatedArr)
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: `Error ${error.message}` })
    }
})

app.get("/top/restaurent/chain", async (req, res) => {
    try {
        const arr = [
            {
                "image": "2b4f62d606d1b2bfba9ba9e5386fabb7.jpeg",
                "offer": "Items at ₹179",
                "title": "Pizza Hut",
                "rating": 4.2,
                "minTime": 30,
                "maxTime": 40,
                "name": "Pizzas",
                "place": "New Jodhpur"
            },
            {
                "image": "75d0b3ebeb56fe2484c944e94cac7a8d.jpeg",
                "offer": "₹50 OFF ABOVE ₹199",
                "title": "Janta Sweet Home",
                "rating": 4.5,
                "minTime": 35,
                "maxTime": 40,
                "name": "Sweets,South Indian",
                "place": "Shastri Nagar"
            },
            {
                "image": "cef5bf4cc31dc3c46a1e1b027c5627e4.jpeg",
                "offer": "₹85 OFF ABOVE ₹149",
                "title": "Parihaar Bhojnalay",
                "rating": 4.3,
                "minTime": 35,
                "maxTime": 40,
                "name": "North India, Thalis",
                "place": "Sardarpura"
            },
            {
                "image": "eillc7d7hbrzcuussus5.jpeg",
                "offer": "₹70 OFF ABOVE ₹149",
                "title": "Kwality Walls Frozen",
                "rating": 4.5,
                "minTime": 25,
                "maxTime": 25,
                "name": "Desserts,Ice Cream",
                "place": "Chopsani Housing Board"
            },
            {
                "image": "6e04be27387483a7c00444f8e8241108.jpeg",
                "offer": "₹1-5 OFF ABOVE ₹179",
                "title": "The Good Bowl",
                "rating": 4.4,
                "minTime": 30,
                "maxTime": 35,
                "name": "Biryani, North India",
                "place": "Shastri Nagar"
            },
            {
                "image": "w7ndo1dkkk6kf4qfz2p1.jpeg",
                "offer": "₹100 OFF ABOVE ₹499",
                "title": "NIC Ice Creams",
                "rating": 4.7,
                "minTime": 25,
                "maxTime": 30,
                "name": "Desserts,Ice Cream",
                "place": "Sardarpura"
            },
            {
                "image": "f1bc9ddf53de574cdc35ab2f717df234.jpeg",
                "offer": "Items at ₹109",
                "title": "Dosh Center",
                "rating": 4.0,
                "minTime": 35,
                "maxTime": 40,
                "name": "South Indian",
                "place": "Chopsani Housing Board"
            },
            {
                "image": "919cb3be0e7406f86f6741ebe7c30128.jpeg",
                "offer": "₹125 OFF ABOVE ₹349",
                "title": "Lunch Box - Meals and Thalis",
                "rating": 4.3,
                "minTime": 30,
                "maxTime": 35,
                "name": "Biryani, North India",
                "place": "Shastri Nagar"
            },
            {
                "image": "535fc9f9c135f7982317bbb6a64a1ffc.jpeg",
                "offer": "₹70 OFF ABOVE ₹249",
                "title": "McDonald's",
                "rating": 4.4,
                "minTime": 30,
                "maxTime": 35,
                "name": "American",
                "place": "Rawaton Ka Bass"
            },
            {
                "image": "2a41aa363a8ae1e98a4cce95c2d0c589.jpeg",
                "offer": "₹100 OFF ABOVE ₹449",
                "title": "Kajal's Cake",
                "rating": 4.5,
                "minTime": 35,
                "maxTime": 40,
                "name": "Cake",
                "place": "Chopsani Housing Board"
            }
        ]

        const uploadPath = path.join(__dirname, "images"); // Path to the uploads directory
        // console.log(uploadPath)
        fs.readdir(uploadPath, (err, files) => {
            if (err) {
                return res.status(500).json({ status: false, message: `Error reading files: ${err.message}` });
            }

            // Map over the restaurant array and match images
            const updatedArr = arr.map(restaurant => {
                const matchingImage = files.find(file => file === restaurant.image);
                return {
                    ...restaurant,
                    image: matchingImage
                        ? `${req.protocol}://${req.get("host")}/uploads/${matchingImage}` // Construct full URL for matched image
                        : null // If no matching image is found, set it to null
                };
            });

            // Respond with the list of file URLs
            // return res.status(200).json({ status: true, images: fileUrls });
            return res.status(200).send(updatedArr)
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: `Error ${error.message}` })
    }
})
app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT} ✅✅✅`)
})