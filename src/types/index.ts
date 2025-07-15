export interface User {
  _id: string;
  username: string;
  name: string;
  profilePic?: string;
  gender: string;
  transactions: Transaction[];
}

export interface Transaction {
  _id: string;
  userId: string;
  description: string;
  paymentType: 'cash' | 'card';
  category: 'saving' | 'expense' | 'investment';
  amount: number;
  location?: string;
  date: string;
  user: User;
}

export interface CategoryStatistics {
  category: string;
  totalAmount: number;
}

// Input types
export interface SignUpInput {
  username: string;
  name: string;
  password: string;
  gender: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface CreateTransactionInput {
  description: string;
  paymentType: 'cash' | 'card';
  category: 'saving' | 'expense' | 'investment';
  amount: number;
  location?: string;
  date: string;
}

export interface UpdateTransactionInput {
  transactionId: string;
  description?: string;
  paymentType?: 'cash' | 'card';
  category?: 'saving' | 'expense' | 'investment';
  amount?: number;
  location?: string;
  date?: string;
}

// Response types
export interface LogoutResponse {
  message: string;
}

// Form types
export interface TransactionFormData {
  description: string;
  paymentType: 'cash' | 'card';
  category: 'saving' | 'expense' | 'investment';
  amount: string;
  location: string;
  date: string;
}
