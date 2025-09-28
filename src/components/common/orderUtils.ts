import { CheckCircle, Truck, Clock, AlertCircle } from 'lucide-react';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
    case 'shipped': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'processing': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered': return <CheckCircle className="h-5 w-5" />;
    case 'shipped': return <Truck className="h-5 w-5" />;
    case 'processing': return <Clock className="h-5 w-5" />;
    case 'cancelled': return <AlertCircle className="h-5 w-5" />;
    default: return <Clock className="h-5 w-5" />;
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
