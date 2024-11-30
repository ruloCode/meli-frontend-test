"use server";

export const getData = () => {
  return {
    type: "ADD_TO_CART",
    payload: "payload"
  };
}

export const fetchData = async (searchTerm, offset = 0) => {
  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(searchTerm)}&offset=${offset}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Formateamos la respuesta para que cumpla con la estructura solicitada
    const categories = data.filters?.find(filter => filter.id === 'category')?.values?.map(value => value.name) || [];
    const items = data.results.map(item => {
      // Obtener el monto de la cuota, si existe
      const installmentsAmount = item.installments?.amount || 0;
      const installmentsQuantity = item.installments?.quantity || 0;
      
      // Crear el mensaje de cuotas si hay cuotas
      const installmentsMessage = installmentsQuantity > 0
        ? `Mismo precio en ${installmentsQuantity} cuotas de $${installmentsAmount.toLocaleString('es-AR')}`
        : 'No aplica';

      // Verificar si el envío es gratuito
      const shippingMessage = item.shipping?.free_shipping ? "Envío gratis" : "Envío no incluido";

      // Verificar si el producto es reacondicionado
      const conditionMessage = item.condition === "refurbished" ? "Reacondicionado" : "";

      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: item.price % 1 !== 0 ? item.price.toString().split('.')[1].length : 0,
          regular_amount: item.original_price || item.price,
        },
        picture: item.thumbnail,
        condition: conditionMessage,  // Aquí agregamos el estado del producto (nuevo o reacondicionado)
        free_shipping: shippingMessage,  // Aquí agregamos el mensaje de envío
        installments: installmentsMessage,  // Aquí agregamos el mensaje de cuotas
        seller: item.seller.nickname,
      };
    });

    return {
      categories,
      items,
      total: data.paging?.total || 0,  // Incluimos el total de productos disponibles
    };
  } catch (error) {
    console.error(error);
  }
};
