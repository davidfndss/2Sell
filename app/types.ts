type Color = "green" | "blue" | "purple" | "red" | "orange" | "yellow";

interface Site {
  name: string, 
  color: Color, 
  icon: string,
  products: Product[], 
  useTopHeader: boolean, 
  useGradientBox: boolean, 
  useTags: boolean, 
  tags: string[], 
  topHeaderText: string, 
  gradientBoxText: string[],
  ownerId: string,
  owner: {
    contactNumber: number
  }
}

interface Product {
  id: string,
  name: string,
  price: number,
  description: string,
  imageUrl: string[],
  createdAt: Date 
}

export type { Color, Site, Product }