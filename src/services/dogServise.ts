import axios from "axios";
import { Dog, DogList } from "../model/dog";

const DOG_API = "https://dog.ceo/api";


class DogService {
  private dogs: Dog[] = [];
  // READ - Busca todos os breeds da API externa
  async getAllBreeds(): Promise<DogList> {
    const response = await axios.get(`${DOG_API}/breeds/list/all`);
    return response.data.message;
  }

  // Adiciona um novo cachorro
  addDog(
    name: string,
    image: string,
    breed: string,
    subBreeds: string[] | null
  ): Dog {
    const newDog: Dog = {
      name,
      breed,
      image,
      subBreeds,
      votos: 0
    };
    this.dogs.push(newDog);
    return newDog;
  }

  voteInDog(dog: Dog) {
    dog.votos++
    return dog
  }

  getTopDogs() {
    return this.dogs.sort((a, b) => b.votos - a.votos).slice(0,3)
  }
  

  // Lista todos os cachorros
  getAllDogs(): Dog[] {
    return this.dogs;
  }

  // Busca por nome
  getDogByName(name: string): Dog | undefined {
    return this.dogs.find((d) => d.name.toLowerCase() === name.toLowerCase());
  }

  // Remove um cachorro
  deleteDog(name: string): boolean {
    const initialLength = this.dogs.length;
    this.dogs = this.dogs.filter((dog) => dog.name !== name);
    return this.dogs.length < initialLength;
  }

  async getImageByBreed(breed: string): Promise<string> {
    console.log(breed)
    const response = await axios.get(`${DOG_API}/breed/${breed}/images/random`);
    return response.data.message;
  }
  async getRandomBreed(): Promise<string> {
    const response = await axios.get(`${DOG_API}/breeds/list/random/1`);
    return response.data.message[0];
  }
}

export default new DogService();
