export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",    
    }).format(amount);
}

export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }
  