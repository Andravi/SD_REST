import { Router } from "express";
import {
  listBreeds,
  addDog,
  listDogs,
  findDog,
  removeDog,
  addVoteInDog,
  top3Dogs
} from "../controllers/dogController";

const router = Router();

// Rotas corretamente tipadas
router.get("/dogs/breeds", listBreeds);
router.post("/dogs", addDog);
router.get("/dogs/vote/:name", addVoteInDog);
router.get("/dogs/votes", top3Dogs);
router.get("/dogs", listDogs);
router.get("/dogs/:name", findDog);
router.delete("/dogs/:name", removeDog);

export default router;
