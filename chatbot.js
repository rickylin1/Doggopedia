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

async function fetchBreedImage(breed) {
    try {
        const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
        return response.data.message; // Return the image URL
    } catch (error) {
        throw new Error('Failed to fetch the image');
    }
}

function displayDogImage(imageUrl) {
    // Create an img element
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = "Dog Image";

    // Get the container where the image will be displayed
    const dogImageContainer = document.getElementById("dog-image-container");

    // Clear any previous images
    dogImageContainer.innerHTML = "";

    // Append the image to the container
    dogImageContainer.appendChild(imgElement);
}

app.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    // Check if the message contains any dog breed
    const dogBreeds = ['affenpinscher', 'african', 'airedale', 'akita', 'appenzeller', 'australian', 'basenji', 'beagle', 'bluetick', 'borzoi', 'bouvier', 'boxer', 'brabancon', 'briard', 'buhund', 'bulldog', 'bullterrier', 'cattledog', 'chihuahua', 'chow', 'clumber', 'cockapoo', 'collie', 'coonhound', 'corgi', 'cotondetulear', 'dachshund', 'dalmatian', 'dane', 'deerhound', 'dhole', 'dingo', 'doberman', 'elkhound', 'entlebucher', 'eskimo', 'finnish', 'frise', 'germanshepherd', 'greyhound', 'groenendael', 'havanese', 'hound', 'husky', 'keeshond', 'kelpie', 'komondor', 'kuvasz', 'labradoodle', 'labrador', 'leonberg', 'lhasa', 'malamute', 'malinois', 'maltese', 'mastiff', 'mexicanhairless', 'mix', 'mountain', 'newfoundland', 'otterhound', 'ovcharka', 'papillon', 'pekinese', 'pembroke', 'pinscher', 'pitbull', 'pointer', 'pomeranian', 'poodle', 'pug', 'puggle', 'pyrenees', 'redbone', 'retriever', 'ridgeback', 'rottweiler', 'saluki', 'samoyed', 'schipperke', 'schnauzer', 'segugio', 'setter', 'sharpei', 'sheepdog', 'shiba', 'shihtzu', 'spaniel', 'spitz', 'springer', 'stbernard', 'terrier', 'tervuren', 'vizsla', 'waterdog', 'weimaraner', 'whippet', 'wolfhound']
    const detectedBreeds = dogBreeds.filter(breed => message.toLowerCase().includes(breed.toLowerCase()));

    if (detectedBreeds.length > 0) {
        // Fetch random image of the first detected breed
        const imageUrl = await fetchBreedImage(detectedBreeds[0]);
        // displayDogImage(data.imageUrl);
        console.log("Here's a random image of", detectedBreeds[0], ":", imageUrl);
        // You can send this image URL as part of your response or handle it as needed
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