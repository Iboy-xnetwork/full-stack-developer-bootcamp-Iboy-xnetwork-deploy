import "dotenv/config";
import express from "express";
import cors from "cors";
//just calint the prisma client from the generated folder
import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const app = express();
// here we connect to the database using the PrismaPg adapter and the connection string from the .env file
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Coffee Brew Log API is running!" });
});

// GET endpoint to fetch all brews from the database
app.get("/api/brews", async (req, res) => {
  try {
    const { method } = req.query;

    const brews = await prisma.brew.findMany({
      where: method
        ? {
            brewMethod: {
              equals: method,
              mode: "insensitive",
            },
          }
        : undefined,
      orderBy: {
        brewDate: "desc",
      },
    });

    res.status(200).json(brews);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch brews",
    });
  }
});

// POST endpoint to create a new brew entry in the database
app.post("/api/brews", async (req, res) => {
  try {
    const { coffeeName, brewMethod, coffeeGrams, waterGrams, rating, tastingNotes } = req.body;

    // Validation
    if (
      !coffeeName ||
      !brewMethod ||
      coffeeGrams === undefined ||
      waterGrams === undefined ||
      rating === undefined ||
      !tastingNotes
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const numericRating = Number(rating);
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        error: "Rating must be an integer between 1 and 5",
      });
    }

    const numericCoffeeGrams = Number(coffeeGrams);
    if (!Number.isInteger(numericCoffeeGrams) || numericCoffeeGrams <= 0) {
      return res.status(400).json({
        error: "Coffee grams must be a positive integer",
      });
    }

    const numericWaterGrams = Number(waterGrams);
    if (!Number.isInteger(numericWaterGrams) || numericWaterGrams <= 0) {
      return res.status(400).json({
        error: "Water grams must be a positive integer",
      });
    }

    const brew = await prisma.brew.create({
      data: {
        coffeeName: coffeeName.trim(),
        brewMethod: brewMethod.trim(),
        coffeeGrams: numericCoffeeGrams,
        waterGrams: numericWaterGrams,
        rating: numericRating,
        tastingNotes: tastingNotes.trim(),
      },
    });

    res.status(201).json(brew);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create brew",
    });
  }
});


// PUT endpoint to update a brew entry in the database
app.put("/api/brews/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid brew ID",
      });
    }

    const { coffeeName, brewMethod, coffeeGrams, waterGrams, rating, tastingNotes } = req.body;

    // Validation
    if (
      !coffeeName ||
      !brewMethod ||
      coffeeGrams === undefined ||
      waterGrams === undefined ||
      rating === undefined ||
      !tastingNotes
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const numericRating = Number(rating);
    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        error: "Rating must be an integer between 1 and 5",
      });
    }

    const numericCoffeeGrams = Number(coffeeGrams);
    if (!Number.isInteger(numericCoffeeGrams) || numericCoffeeGrams <= 0) {
      return res.status(400).json({
        error: "Coffee grams must be a positive integer",
      });
    }

    const numericWaterGrams = Number(waterGrams);
    if (!Number.isInteger(numericWaterGrams) || numericWaterGrams <= 0) {
      return res.status(400).json({
        error: "Water grams must be a positive integer",
      });
    }

    // Check that the brew exists
    const existingBrew = await prisma.brew.findUnique({
      where: { id },
    });

    if (!existingBrew) {
      return res.status(404).json({
        error: "Brew not found",
      });
    }

    // Update the brew
    const updatedBrew = await prisma.brew.update({
      where: { id },
      data: {
        coffeeName: coffeeName.trim(),
        brewMethod: brewMethod.trim(),
        coffeeGrams: numericCoffeeGrams,
        waterGrams: numericWaterGrams,
        rating: numericRating,
        tastingNotes: tastingNotes.trim(),
      },
    });

    res.status(200).json(updatedBrew);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update brew",
    });
  }
});

// lets add the DELETE endpoint to delete a brew entry in the database
app.delete("/api/brews/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error: "Invalid brew ID",
      });
    }

    const existingBrew = await prisma.brew.findUnique({
      where: {
        id,
      },
    });

    if (!existingBrew) {
      return res.status(404).json({
        error: "Brew not found",
      });
    }

    await prisma.brew.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete brew",
    });
  }
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});