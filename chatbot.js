import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    // Check if the message contains any dog breed
    const isDogBreed = dogBreeds.some(breed => message.toLowerCase().includes(breed.toLowerCase()));

    if (isDogBreed) {
      console.log("DOGGY DOGGY");
    } 

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "system", content: message }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      res.json({
        completion: response.data.choices[0].message,
      });
    }
   catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});