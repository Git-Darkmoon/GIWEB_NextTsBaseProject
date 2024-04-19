import axios from "axios"

export async function getProducts(): Promise<any> {
  const response = await axios.get("https://fakestoreapi.com/products")
  return response
}

export async function getSingleProduct(id: string | string[]): Promise<any> {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
  const singleProductData = await response.data
  return singleProductData
}
