export const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'text-green-600 bg-green-50';
    case 'shipped': return 'text-blue-600 bg-blue-50';
    case 'processing': return 'text-yellow-600 bg-yellow-50';
    case 'cancelled': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered': return 'CheckCircle';
    case 'shipped': return 'Truck';
    case 'processing': return 'Clock';
    case 'cancelled': return 'AlertCircle';
    default: return 'Clock';
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export const formatCurrency = (amount: number) => {
  return `R${amount.toFixed(2)}`;
};
