export async function fetchProductData(id) {
    try {
        // Hacer la primera solicitud para obtener los datos del producto
        const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
        const data = await response.json();

        // Hacer la segunda solicitud para obtener la descripción del producto
        const descriptionResponse = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
        const descriptionData = await descriptionResponse.json();

        // Hacer una solicitud adicional para obtener el nombre de la categoría
        const categoryResponse = await fetch(`https://api.mercadolibre.com/categories/${data.category_id}`);
        const categoryData = await categoryResponse.json();

        // Buscar el objeto de color dentro de los atributos
        const colorAttribute = data.attributes.find(attribute => attribute.id === "COLOR");

        // Obtener el valor del color, si existe
        const colorValue = colorAttribute ? colorAttribute.value_name : null;

        // Extraer el camino de categorías para el breadcrumb
        const categoryPath = categoryData.path_from_root.map(cat => cat.name);

        // Estructurar la información del precio
    

        // Construir el objeto con la estructura solicitada
        const newData = {
            id: data.id,
            title: data.title,
            price: data.price,
            pictures: data.pictures.map(pic => pic.url), // solo los URLs de las imágenes
            condition: data.condition, // "new", "used", "refurbished"
            free_shipping: data.shipping.free_shipping,
            categorys: categoryPath,
            // sold_quantity: data.sold_quantity,
            // installments: data.installments ? data.installments.quantity : null, // cantidad de cuotas, si existe
            description: descriptionData.plain_text,
            attributes: data.attributes.map(attr => ({
                id: attr.id,
                name: attr.name,
                value_name: attr.value_name
            })),
            color: colorValue,
            category_path_from_root: categoryPath
        }

        return newData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const fetchDataResults = async (searchTerm, offset = 0, limit = 10) => {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(searchTerm)}&offset=${offset}&limit=${limit}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const categories = data.filters?.find(filter => filter.id === 'category')?.values?.map(value => value.name) || [];
      const items = data.results.map(item => {
        const installmentsAmount = item.installments?.amount || 0;
        const installmentsQuantity = item.installments?.quantity || 0;
  
        const installmentsMessage = installmentsQuantity > 0
          ? `Mismo precio en ${installmentsQuantity} cuotas de $${installmentsAmount.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
          : '';
  
        const shippingMessage = item.shipping?.free_shipping ? "Envío gratis" : "";
  
        const conditionMessage = item.condition === "refurbished" ? "Reacondicionado" : "";
  
        const originalPrice = item.original_price || item.price;
        const currentPrice = item.price;
  
        const discountPercentage = originalPrice > 0 ? ((originalPrice - currentPrice) / originalPrice) * 100 : 0;
  
        const discountPercentageRounded = Math.round(discountPercentage);
  
        return {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: currentPrice,
            decimals: currentPrice % 1 !== 0 ? currentPrice.toString().split('.')[1].length : 0,
            regular_amount: originalPrice,
          },
          picture: item.thumbnail,
          condition: conditionMessage,
          free_shipping: shippingMessage,
          installments: installmentsMessage,
          seller: item.seller.nickname,
          original_price: originalPrice,
          discount_percentage: discountPercentageRounded,
        };
      });
  
      return {
        categories,
        items,
        total: data.paging?.total || 0,
      };
    } catch (error) {
      console.error(error);
      return { categories: [], items: [], total: 0 };
    }
  };
