import { getProducts } from "@/lib/products-api"
import HomeClient from "./home-client"

export default async function Page() {
  const products = await getProducts()
  return <HomeClient products={products} />
}
