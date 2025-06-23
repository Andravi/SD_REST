import { Router } from "express";
import {
  listBreeds,
  addDog,
  listDogs,
  findDog,
  removeDog,
} from "../controllers/dogController";

const router = Router();

// Rotas corretamente tipadas
router.get("/dogs/breeds", listBreeds);
router.post("/dogs", addDog);
router.get("/dogs", listDogs);
router.get("/dogs/:name", findDog);
router.delete("/dogs/:name", removeDog);

export default router;
