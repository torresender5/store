import { products as staticProducts } from "@/data/products"
import { ApiProduct, Category, Product } from "@/lib/types"
import axios from 'axios';

const API_URL = process.env.API_URL ?? "http://localhost:3000"
const REVALIDATE_SECONDS = 60

function basicAuthHeader(): string | null {
  const user = process.env.API_AUTH_USER
  const password = process.env.API_AUTH_PASSWORD
  if (!user || !password) return null
  return `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`
}

function mapApiProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: apiProduct.salePrice,
    description: apiProduct.description ?? "",
    category: apiProduct.category as Category,
    image: apiProduct.image ?? "",
    sizes: (apiProduct.sizes ?? []).map((s) => s.size),
  }
}

export async function getProducts(): Promise<Product[]> {
  const authorization = basicAuthHeader()
  if (!authorization) {
    console.warn("[products-api] Sin credenciales API_AUTH_USER/API_AUTH_PASSWORD, usando datos estáticos")
    return staticProducts
  }

  try {
    // const response = await fetch(`${API_URL}/products`, {
    //   headers: { Authorization: authorization },
    //   next: { revalidate: REVALIDATE_SECONDS },
    // })
    const response = await axios.get(`${API_URL}/products`, {
      headers: { Authorization: authorization },
      timeout: 5000 // 5 segundos de límite antes de ir al catch
    });
    // console.log('##### response', response )
    // if (!response.ok) {
    //   throw new Error(`El API respondió ${response.status}`)
    // }
    const data = response.data as ApiProduct[];
    return data ? data.map(mapApiProduct) : staticProducts;
    // const data = (await response.json()) as ApiProduct[]
    // console.log('########', data)
    // return data ? data?.map(mapApiProduct) : staticProducts;
  } catch (error) {
    console.error("[products-api] No se pudo obtener productos del API, fallback a datos estáticos:", error)
    return staticProducts
  }
}
