import { Request, Response } from "express";
import DogService from "../services/dogServise";

// Tipos para as requisições
interface DogParams {
  name?: string;
}

interface DogBody {
  name: string;
  breed: string;
  subBreeds?: string[];
}

export const listBreeds = async (req: Request, res: Response) => {
  try {
    const breeds = await DogService.getAllBreeds();
    res.json(breeds);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch breeds" });
  }
};

export const addDog = async (req: Request, res: Response, next: Function): Promise<void> => {
  let { name, breed, subBreeds } = req.body;

  if (!name) {
    res.status(400).json({ error: "Name required" });
  }
  // Precisará obrigatoriamente do nome
  if (!breed) {
    // TODO Fazer com que só precise ter o nome, ai um cachorro sera criado, você pode escolher a raça mas a imagem será aleatória
    breed = await DogService.getRandomBreed()
  }

  const image = await DogService.getImageByBreed(breed)

    try {
      const newDog = DogService.addDog(name, breed, image, subBreeds || null);
      res.status(201).json(newDog);
    } catch (error) {
      res.status(500).json({ error: "Failed to add dog" });
    }
  next()
};

export const listDogs = (req: Request, res: Response) => {
  try {
    const dogs = DogService.getAllDogs();
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dogs" });
  }
};

export const findDog = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void> => {
  try {
    const dogName = req.params.name;
    if (!dogName) {
      res.status(400).json({ error: "Name parameter is required" });
    }

    const dog = DogService.getDogByName(dogName);
    if (dog) {
      res.json(dog);
    } else {
      res.status(404).json({ error: "Dog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
};

export const removeDog = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void> => {
  try {
    const dogName = req.params.name;
    if (!dogName) {
      res.status(400).json({ error: "Name parameter is required" });
    }

    const deleted = DogService.deleteDog(dogName);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Dog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete dog" });
  }
};

export const addVoteInDog = (req: Request, res: Response) => {
  try {
    const dogName = req.params.name;
    if (!dogName) {
      res.status(400).json({ error: "Name parameter is required" });
    }
    const dog = DogService.getDogByName(dogName)

    if (dog != undefined) {
      DogService.voteInDog(dog);
      res.status(200).json(dog);

    } else {
      res.status(404).json(dog);
    }

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dogs" });
  }
};

export const top3Dogs = (req: Request, res: Response) => {
  try {
    const dogs = DogService.getTopDogs();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dogs" });
  }
};

