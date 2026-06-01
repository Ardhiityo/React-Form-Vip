import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: string;
  rate: number;
  count: number;
};

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      headers: {
        Accept: "application/json",
      },
    });
    return response.json();
  } catch (error) {
    new Error(error);
  }
}

function Product() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts(),
  });

  if (isError) {
    return (
      <div className="container mx-auto min-h-screen flex items-center justify-center mt-12">
        <h3 className="text-2xl font-semibold">Ups, Something went wrong!</h3>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4 mt-12">
        <h1 className="text-2xl font-semibold mb-5">Products</h1>
        <section className="grid lg:grid-cols-5 md:grid-cols-4 gap-5">
          {isLoading ? (
            <Loading />
          ) : (
            data.map((item: Product) => (
              <div className="border-2 border-slate-200 p-3">
                <div className="flex justify-center pt-10">
                  <img src={item.image} alt={item.title} className="h-32" />
                </div>
                <div className="flex flex-col px-3 py-4 gap-5">
                  <p className="font-semibold truncate" title={item.title}>
                    {item.title}
                  </p>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">${item.price}</h3>
                    <button className="py-1 px-2 bg-green-600 font-semibold rounded-md">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </>
  );
}

export default Product;
