import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_STATISTICS } from '@/graphql/transaction';
import { Layout } from '@/components/layout/Layout';
import { Card, LoadingSpinner } from '@/components/ui';
import { formatCurrency } from '@/utils';
import { CategoryStatistics } from '@/types';
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
  LineChart,
  Line,
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_CATEGORY_STATISTICS);

  const categoryStats: CategoryStatistics[] = data?.categoryStatistics || [];

  const COLORS = {
    expense: '#ef4444',
    saving: '#10b981',
    investment: '#3b82f6',
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600">
            Error loading analytics: {error.message}
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Detailed insights into your financial data
          </p>
        </div>

        {categoryStats.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Data Available
              </h3>
              <p className="text-gray-500">
                Add some transactions to see analytics here.
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Category Distribution
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={categoryStats}
                    dataKey="totalAmount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label={({ category, totalAmount }) =>
                      `${category}: ${formatCurrency(totalAmount)}`
                    }
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
            </Card>

            {/* Bar Chart */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Category Comparison
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={categoryStats}>
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Bar dataKey="totalAmount" radius={[4, 4, 0, 0]}>
                    {categoryStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.category as keyof typeof COLORS]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* Summary Cards */}
        {categoryStats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryStats.map((stat) => (
              <Card key={stat.category}>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 capitalize mb-2">
                    {stat.category}
                  </h3>
                  <p
                    className={`text-3xl font-bold ${
                      stat.category === 'expense'
                        ? 'text-red-600'
                        : stat.category === 'saving'
                          ? 'text-green-600'
                          : 'text-blue-600'
                    }`}
                  >
                    {formatCurrency(stat.totalAmount)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Total{' '}
                    {stat.category === 'expense' ? 'spent' : 'accumulated'}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
