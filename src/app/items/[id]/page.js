import { fetchProductData } from "../../../lib/data";
import ProductDetail from "@/components/organisms/productDetail/ProductDetail";

export async function generateMetadata(props) {
  const { params } = props;
  const { id } = params;

  const baseUrl = "https://meli-frontend-test-nu.vercel.app/";
  const productCanonicalUrl = `${baseUrl}/${id}`;
  try {
    const product = await fetchProductData(id);

    // Generar keywords basadas en la información del producto
    const keywords = [product?.title, product.free_shipping]
      .filter(Boolean)
      .join(", ");

    const metadata = {
      title: `${product?.title} - ${product.price}`,
      keywords: keywords,
      alternates: {
        canonical: productCanonicalUrl,
      },
      description: `Compra ${product?.title} en Mercado Libre. ${product?.description.replace(
        /[#*\-\n]/g,
        ""
      )}`.slice(0, 320),

      openGraph: {
        title: `${product?.title} - ${product.price}`,
        description: `Compra ${
          product?.title
        } en Mercado Libre. ${product?.description.replace(
          /[#*\-\n]/g,
          ""
        )}`.slice(0, 320),
        url: productCanonicalUrl,
        siteName: "meli-frontend-test",
        images: [
          {
            url: product?.pictures[0],
            width: 480,
            height: 480,
            alt: `${product?.title}`,
          },
        ],
        locale: "es_ARG",
        type: "website",
      },

      viewport: "width=device-width, initial-scale=1.0",
      creator: "Meli",
      publisher: "Meli",
    };

    return metadata;
  } catch (error) {
    const notFoundCanonicalUrl = `${baseUrl}/producto-no-encontrado`;

    return {
      title: "Producto no encontrado",
      description:
        "Lo sentimos, el producto que estás buscando no está disponible. ",
      alternates: {
        canonical: notFoundCanonicalUrl,
      },
    };
  }
}

export default async function Slug(props) {
  const { params } = props;
  const { id } = params;
  const product = await fetchProductData(id);

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}
