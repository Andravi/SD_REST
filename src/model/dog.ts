export interface Dog {
  name: string;
  breed: string;
  image: string;
  subBreeds?: string[] | null;
  votos?: boolean; 
}

export type DogList = Record<string, string[]>;
