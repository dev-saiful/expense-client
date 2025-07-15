import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { CREATE_TRANSACTION, GET_TRANSACTIONS } from '@/graphql/transaction';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Card } from '@/components/ui';
import { TransactionFormData, CreateTransactionInput } from '@/types';

export const AddTransactionPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS }],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionFormData>();

  const onSubmit = async (data: TransactionFormData) => {
    try {
      setError('');
      const input: CreateTransactionInput = {
        description: data.description,
        paymentType: data.paymentType,
        category: data.category,
        amount: parseFloat(data.amount),
        location: data.location || undefined,
        date: data.date,
      };

      await createTransaction({ variables: { input } });
      reset();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create transaction');
    }
  };

  const categoryOptions = [
    { value: '', label: 'Select category' },
    { value: 'expense', label: 'Expense' },
    { value: 'saving', label: 'Saving' },
    { value: 'investment', label: 'Investment' },
  ];

  const paymentTypeOptions = [
    { value: '', label: 'Select payment type' },
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Card' },
  ];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Transaction</h1>
          <p className="text-gray-600 mt-1">
            Record a new financial transaction
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Input
              label="Description"
              type="text"
              {...register('description', {
                required: 'Description is required',
              })}
              error={errors.description?.message}
              placeholder="e.g., Grocery shopping, Salary, Stock investment"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Category"
                options={categoryOptions}
                {...register('category', { required: 'Category is required' })}
                error={errors.category?.message}
              />

              <Select
                label="Payment Type"
                options={paymentTypeOptions}
                {...register('paymentType', {
                  required: 'Payment type is required',
                })}
                error={errors.paymentType?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Amount"
                type="number"
                step="0.01"
                min="0"
                {...register('amount', {
                  required: 'Amount is required',
                  min: {
                    value: 0.01,
                    message: 'Amount must be greater than 0',
                  },
                })}
                error={errors.amount?.message}
                placeholder="0.00"
              />

              <Input
                label="Date"
                type="date"
                {...register('date', { required: 'Date is required' })}
                error={errors.date?.message}
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>

            <Input
              label="Location (Optional)"
              type="text"
              {...register('location')}
              error={errors.location?.message}
              placeholder="e.g., Walmart, Bank, Online"
            />

            <div className="flex space-x-4">
              <Button type="submit" loading={loading} className="flex-1">
                Add Transaction
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};
