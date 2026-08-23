export type Category = "hombre" | "mujer" | "accesorios"

export interface ProductSizeStock {
  size: string
  stock?: number
}

export interface ApiProduct {
  id: number
  name: string
  description: string | null
  code: string
  purchasePrice: number
  salePrice: number
  stock: number
  sku: string
  type: string
  category: string
  image: string | null
  sizes: ProductSizeStock[] | null
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: number
  name: string
  price: number
  description: string
  category: Category
  image: string
  sizes: string[]
}
