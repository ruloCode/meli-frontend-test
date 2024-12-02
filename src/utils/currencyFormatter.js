export const formatCurrency = (value) => {
    if (value == null) return "$ 0";
  
    const integerValue = Math.floor(value); 
  
  
    return '$ ' + new Intl.NumberFormat('es-CO').format(integerValue);
  };
  