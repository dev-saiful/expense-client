import React from 'react';
import { useQuery } from '@apollo/client';
import {
  GET_TRANSACTIONS,
  GET_CATEGORY_STATISTICS,
} from '@/graphql/transaction';
import { Layout } from '@/components/layout/Layout';
import { Card, LoadingSpinner, EmptyState } from '@/components/ui';
import { formatCurrency, getCategoryColor, getNetWorth } from '@/utils';
import { Transaction, CategoryStatistics } from '@/types';
import { TrendingUp, TrendingDown, DollarSign, PlusCircle } from 'lucide-react';
import { Link } from 'react-router';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { data: transactionsData, loading: transactionsLoading } =
    useQuery(GET_TRANSACTIONS);
  const { data: statsData, loading: statsLoading } = useQuery(
    GET_CATEGORY_STATISTICS
  );

  const transactions: Transaction[] = transactionsData?.transactions || [];
  const categoryStats: CategoryStatistics[] =
    statsData?.categoryStatistics || [];

  const netWorth = getNetWorth(transactions);
  const totalIncome = transactions
    .filter((t) => ['saving', 'investment'].includes(t.category))
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.category === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const recentTransactions = transactions.slice(0, 5);

  const COLORS = {
    expense: '#ef4444',
    saving: '#10b981',
    investment: '#3b82f6',
  };

  if (transactionsLoading || statsLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's your financial overview.
            </p>
          </div>
          <Link to="/add-transaction">
            <button className="btn-primary flex items-center space-x-2">
              <PlusCircle className="h-4 w-4" />
              <span>Add Transaction</span>
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Worth</p>
                <p
                  className={`text-2xl font-bold ${netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {formatCurrency(netWorth)}
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${netWorth >= 0 ? 'bg-green-100' : 'bg-red-100'}`}
              >
                {netWorth >= 0 ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Income
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalIncome)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalExpenses)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Category Breakdown
            </h3>
            {categoryStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryStats}
                    dataKey="totalAmount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                  >
                    {categoryStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.category as keyof typeof COLORS]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </Card>

          {/* Bar Chart */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Category Statistics
            </h3>
            {categoryStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryStats}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="totalAmount">
                    {categoryStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.category as keyof typeof COLORS]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available
              </div>
            )}
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h3>
            <Link
              to="/transactions"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all
            </Link>
          </div>

          {recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${getCategoryColor(transaction.category)}`}
                    >
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category} • {transaction.paymentType}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${getCategoryColor(transaction.category)}`}
                    >
                      {transaction.category === 'expense' ? '-' : '+'}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No transactions yet"
              description="Start by adding your first transaction to see it here."
              action={
                <Link to="/add-transaction">
                  <button className="btn-primary">Add Transaction</button>
                </Link>
              }
            />
          )}
        </Card>
      </div>
    </Layout>
  );
};
