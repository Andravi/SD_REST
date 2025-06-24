export interface Dog {
  name: string;
  breed: string;
  image: string;
  subBreeds?: string[] | null;
  votos: number; 
}

export type DogList = Record<string, string[]>;
