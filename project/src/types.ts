export interface Product {
  id: string;
  name: string;
  description: string;
  details: string[];
  currentPrice: number;
  previousPrice?: number;
  images: string[];
  category: string;
  externalLink: string;
  createdAt: Date;
}

export interface User {
  email: string;
  password: string;
}