"use client";




export const fetchData = async (searchTerm, offset = 0, limit = 10) => {
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
        : 'No aplica';

      const shippingMessage = item.shipping?.free_shipping ? "Envío gratis" : "Envío no incluido";

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







