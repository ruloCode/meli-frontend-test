// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // Usar router para navegar
// import Image from "@/components/atoms/image/Image";
// import styles from "./Item.module.scss";

// const ItemPage = ({ params }) => {
//   const { id } = params; // Obtener el ID del producto desde los params
//   const [itemDetails, setItemDetails] = useState(null); // Estado para almacenar los detalles del producto
//   const [loading, setLoading] = useState(true); // Estado de carga
//   const [error, setError] = useState(null); // Estado para errores

//   const router = useRouter(); // Instanciar el router para la navegación

//   // Recuperar el 'searchTerm' guardado en localStorage
//   const storedSearchTerm =
//     typeof window !== "undefined" ? localStorage.getItem("searchTerm") : null;

//   useEffect(() => {
//     // Función para obtener los detalles del producto desde la API
//     const fetchItemDetails = async () => {
//       setLoading(true);
//       setError(null); // Limpiar errores anteriores

//       try {
//         const response = await fetch(
//           `https://api.mercadolibre.com/items/${id}`
//         );
//         const data = await response.json();
//         setItemDetails(data); // Almacenar los detalles del producto
//       } catch (error) {
//         setError("Error al cargar los detalles del producto.");
//         console.error(error);
//       } finally {
//         setLoading(false); // Finalizar la carga
//       }
//     };

//     if (id) {
//       fetchItemDetails(); // Llamar a la función para obtener los detalles
//     }
//   }, [id]); // Solo se ejecuta cuando el ID cambia

//   // Mientras cargamos, mostramos un mensaje de "Cargando..."
//   if (loading) return <p>Cargando detalles del producto...</p>;

//   // Si hay un error, mostramos el mensaje de error
//   if (error) return <p>{error}</p>;

//   // Si no hay detalles del producto, mostramos un mensaje
//   if (!itemDetails)
//     return <p>No se encontró información para este producto.</p>;

//   // Función para regresar al listado de productos con el mismo término de búsqueda
//   const goBackToListing = () => {
//     // Navegar de regreso a la página de resultados, manteniendo solo el término de búsqueda
//     const searchQuery = storedSearchTerm
//       ? `search=${encodeURIComponent(storedSearchTerm)}`
//       : "";
//     router.push(`/items?${searchQuery}`);
//   };

//   return (
//     <div>
//       <h1>{itemDetails.title}</h1>
//       <p>
//         <strong>Precio:</strong> ${itemDetails.price}
//       </p>
//       <p>
//         <strong>Descripción:</strong> {itemDetails.description}
//       </p>

//       {/* Mostrar la imagen del producto */}
//       <div>
//         {itemDetails.pictures && itemDetails.pictures.length > 0 && (
//           <Image
//             src={itemDetails.pictures[0].url} // URL de la imagen
//             alt={itemDetails.title} // Texto alternativo
//             width={500} // Ancho máximo de la imagen
//             height={500} // El alto se ajustará automáticamente para mantener la proporción
//             className={styles["image__container"]}
//           />
//         )}
//       </div>

//       {/* Botón para volver al listado de productos */}
//       <button onClick={goBackToListing}>Volver al listado</button>
//     </div>
//   );
// };

// export default ItemPage;
import Breadcrumbs from '@/components/molecules/breadcrumbs/Breadcrumbs'
import { fetchProductData } from '../../../lib/data'
import ProductDetail from '@/components/organisms/productDetail/ProductDetail'

export default async function Slug(props) {
  const { params } = props
  const { id } = params
  const product = await fetchProductData(id)

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  )

}

