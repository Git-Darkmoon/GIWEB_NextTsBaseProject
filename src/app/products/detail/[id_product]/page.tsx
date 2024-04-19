"use client"

import { MainLayout } from "@/layouts"
import { getSingleProduct } from "@/services/prodcts"
import { FakeProduct } from "@/types/fakeProduct"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProductDetail() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<FakeProduct>()

  const params = useParams()
  const { id_product } = params

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const singleProductData = await getSingleProduct(id_product)
        setProduct(singleProductData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id_product])

  const sizeButtons = ["S", "M", "L", "XL"] as const

  return (
    <MainLayout>
      {isLoading ? (
        <h1 className="text-slate-800 text-2xl">Cargando Producto...</h1>
      ) : (
        <article className=" py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              {/* Left side information, picture and buttons */}
              <aside className="md:flex-1 px-4">
                <picture className="block h-[460px] rounded-lg mb-4">
                  <Image
                    className="w-full h-full object-center object-contain aspect-square mix-blend-multiply"
                    src={product?.image ?? "/"}
                    alt="Product Image"
                    width={960}
                    height={600}
                    priority
                  />
                </picture>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
                    <button className="w-full bg-slate-900   text-white py-2 px-4 rounded-full font-bold hover:bg-slate-800 transition-colors ">
                      Add to Cart
                    </button>
                  </div>
                  <div className="w-1/2 px-2">
                    <button className="w-full bg-gray-200   text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300 transition-colors ">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </aside>

              {/* Right side information, product details */}
              <main className="md:flex-1 px-4">
                {/* TITLE */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {product?.title}
                </h2>
                {/* CATEGORY */}
                <p className="text-gray-600 text-sm mb-4 capitalize">
                  {product?.category}
                </p>
                {/* PRICE AND AVAILABILITY */}
                <section className="flex mb-4">
                  <div className="mr-4">
                    <span className="font-bold text-gray-700 ">Price:</span>
                    <span className="text-gray-600 "> ${product?.price}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 ">
                      Availability:
                    </span>
                    <span className="text-gray-600 "> In Stock</span>
                  </div>
                </section>
                {/* COLOR */}
                <div className="mb-4">
                  <span className="font-bold text-gray-700 ">
                    Select Color:
                  </span>
                  <div className="flex items-center mt-2">
                    <button className="size-6 rounded-full bg-pale-blue mr-2 hover:scale-110 transition-transform"></button>
                    <button className="size-6 rounded-full bg-alert-red mr-2 hover:scale-110 transition-transform"></button>
                    <button className="size-6 rounded-full bg-dark-blue mr-2 hover:scale-110 transition-transform"></button>
                    <button className="size-6 rounded-full bg-alert-yellow mr-2 hover:scale-110 transition-transform"></button>
                  </div>
                </div>
                {/* SIZE */}
                <section className="mb-4">
                  <span className="font-bold text-gray-700">Select Size:</span>
                  <div className="flex items-center mt-2">
                    {sizeButtons.map((size) => (
                      <button
                        key={size}
                        className="bg-slate-200 text-gray-700 py-2 px-4 rounded-full font-bold mr-2 hover:bg-slate-300 transition-colors "
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </section>
                {/* DESCRIPTION */}
                <div>
                  <span className="font-bold text-gray-700">
                    Product Description:
                  </span>
                  <p className="text-gray-600 text-sm mt-2">
                    {product?.description}.
                  </p>
                </div>
              </main>
            </div>
          </div>
        </article>
      )}
    </MainLayout>
  )
}
