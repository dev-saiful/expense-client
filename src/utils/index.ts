import { Transaction, CategoryStatistics } from '@/types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getCategoryColor = (category: string): string => {
  const colors = {
    expense: 'text-red-600',
    saving: 'text-green-600',
    investment: 'text-blue-600',
  };
  return colors[category as keyof typeof colors] || 'text-gray-600';
};

export const getCategoryBgColor = (category: string): string => {
  const colors = {
    expense: 'bg-red-50 border-red-200',
    saving: 'bg-green-50 border-green-200',
    investment: 'bg-blue-50 border-blue-200',
  };
  return (
    colors[category as keyof typeof colors] || 'bg-gray-50 border-gray-200'
  );
};

export const getPaymentTypeIcon = (paymentType: string): string => {
  return paymentType === 'card' ? '💳' : '💵';
};

export const calculateTotalByCategory = (
  transactions: Transaction[]
): CategoryStatistics[] => {
  const categoryTotals = transactions.reduce(
    (acc, transaction) => {
      const { category, amount } = transaction;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.entries(categoryTotals).map(([category, totalAmount]) => ({
    category,
    totalAmount,
  }));
};

export const getNetWorth = (transactions: Transaction[]): number => {
  return transactions.reduce((total, transaction) => {
    if (transaction.category === 'expense') {
      return total - transaction.amount;
    }
    return total + transaction.amount;
  }, 0);
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
