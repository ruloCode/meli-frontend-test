"use server";


export const getData = () => {
    return {
        type: "ADD_TO_CART",
        payload: "payload"
    }
}

export const fetchData = async (searchTerm, offset = 0) => {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(searchTerm)}&offset=${offset}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return {
        results: data?.results,  // Los productos
        total: data?.paging?.total,  // El total de productos disponibles
      };
    } catch (error) {
      console.error(error);
    }
  };
  