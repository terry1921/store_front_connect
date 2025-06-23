export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
}

export interface FeaturedProduct {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  imageHint: string;
}

export enum LabelType {
  Sticker = "Sticker",
  BumperSticker = "Bumper Sticker",
  Button = "Button",
  Magnet = "Magnet",
  TShirt = "T-shirt",
  EconomyStickers = "Economy stickers",
  StickersSheets = "Stickers sheets",
  CustomHats = "Custom hats",
}

export interface Product {
  id: number;
  title: string;
  link: string;
  label: LabelType;
  imageUrl: string;
}
