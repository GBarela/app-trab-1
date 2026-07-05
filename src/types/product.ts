import { ImageSourcePropType } from 'react-native';

export type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  installments: string;
  image: string | ImageSourcePropType;
  category: string;
  badge?: string;
  description: string;
  highlights: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};