import Script from "next/script";
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
  const productData = await fetchProductData(id);

  const baseUrl = "https://meli-frontend-test-nu.vercel.app/";
  const productCanonicalUrl = `${baseUrl}/${id}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': (productData?.title || 'Producto').substring(0, 100),
    'image': productData?.pictures[0] ,
    'description': `${productData?.description}`,
    'sku': productData?.id || 'SKU no disponible',
    'mpn': productData?.id || 'MPN no disponible',
  
    'category': productData?.category_path_from_root[0] || 'Categoría no especificada',
    'offers': {
      '@type': 'Offer',
      'url': productCanonicalUrl,
      'priceCurrency': 'MXN',
      'price': Number(productData?.price),
      'priceValidUntil': '2024-12-31',
      'itemCondition': 'https://schema.org/NewCondition',
      'availability': 'https://schema.org/InStock',
      'shippingDetails': {
        '@type': 'OfferShippingDetails',
        'shippingRate': {
          '@type': 'MonetaryAmount',
          'value': '0',
          'currency': 'ARG',
        },
        'shippingDestination': {
          '@type': 'DefinedRegion',
          'addressCountry': 'ARG',
        },
        'deliveryTime': {
          '@type': 'ShippingDeliveryTime',
          'handlingTime': {
            '@type': 'QuantitativeValue',
            'minValue': '0',
            'maxValue': '1',
            'unitCode': 'DAY',
          },
          'transitTime': {
            '@type': 'QuantitativeValue',
            'minValue': '1',
            'maxValue': '5',
            'unitCode': 'DAY',
          },
        },
      },
      'seller': {
        '@type': 'Organization',
        'name': 'Meli',
      },
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.5',
      'reviewCount': 270,
    },
    'hasMerchantReturnPolicy': {
      '@type': 'MerchantReturnPolicy',
      'applicableCountry': 'ARG',
      'returnPolicyCategory': 'https://schema.org/MerchantReturnFiniteReturnWindow',
      'merchantReturnDays': 30,
      'returnMethod': 'https://schema.org/ReturnByMail',
      'returnFees': 'https://schema.org/FreeReturn',
    },
  }

  return (
    <div>
        <Script
        id='faq-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ProductDetail product={productData} />
    </div>
  );
}
