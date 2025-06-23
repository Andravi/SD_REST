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
  addDog(name: string, image: string, breed: string, subBreeds: string[] | null): Dog {
    const newDog: Dog = {
      name,
      breed,
      image,
      subBreeds
    };
    this.dogs.push(newDog);
    return newDog;
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

  getImageByBreed(breed: string): string { 
    return "COLOCAR STRING AQUI"
  }
  getRandomBreed(): string{
    return "brend"
  }
}

export default new DogService();
