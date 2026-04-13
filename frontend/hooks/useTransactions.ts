'use client';

import { useEffect, useState } from 'react';
import { Transaction } from '@/types/transaction';
import {
  createTransaction,
  getTransactions,
  removeTransaction,
  updateTransaction,
  toggleFavorite,
} from '@/lib/api';

interface TransactionPayload {
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  notes: string;
  favorite: boolean;
  tags: string[];
  paymentMethod: 'cash' | 'credit';
  cardName: string;
}

interface FormErrors {
  title?: string;
  amount?: string;
  date?: string;
  tags?: string;
  cardName?: string;
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

function normalizeTags(rawTags: string) {
  return Array.from(
    new Set(
      rawTags
        .split(',')
        .map((tag) => tag.trim().replace(/^#+/, ''))
        .filter(Boolean)
    )
  ).slice(0, 8);
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Outros');
  const [date, setDate] = useState(getTodayDate());
  const [notes, setNotes] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit'>('cash');
  const [cardName, setCardName] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [favoriteLoadingId, setFavoriteLoadingId] = useState<number | null>(
    null
  );

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    const trimmedTitle = title.trim();
    const numericAmount = Number(amount);
    const normalizedTags = normalizeTags(tagsInput);

    if (!trimmedTitle) {
      newErrors.title = 'Digite um nome para a transação.';
    } else if (trimmedTitle.length > 60) {
      newErrors.title = 'O nome deve ter no máximo 60 caracteres.';
    }

    if (!amount) {
      newErrors.amount = 'Digite um valor.';
    } else if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      newErrors.amount = 'O valor deve ser maior que zero.';
    }

    if (!date) {
      newErrors.date = 'Selecione uma data.';
    }

    if (normalizedTags.some((tag) => tag.length > 20)) {
      newErrors.tags = 'Cada tag deve ter no máximo 20 caracteres.';
    }

    if (paymentMethod === 'credit' && !cardName.trim()) {
      newErrors.cardName = 'Informe o nome do cartão.';
    } else if (paymentMethod === 'credit' && cardName.trim().length > 30) {
      newErrors.cardName = 'O nome do cartão deve ter no máximo 30 caracteres.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setType('expense');
    setCategory('Outros');
    setDate(getTodayDate());
    setNotes('');
    setTagsInput('');
    setPaymentMethod('cash');
    setCardName('');
    setFavorite(false);
    setEditingId(null);
    setErrors({});
  };

  const handleSubmit = async (
    e: React.FormEvent
  ): Promise<{ success: boolean; message: string }> => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return {
        success: false,
        message: 'Corrija os campos antes de salvar.',
      };
    }

    const payload: TransactionPayload = {
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date,
      notes: notes.trim(),
      favorite,
      tags: normalizeTags(tagsInput),
      paymentMethod,
      cardName: paymentMethod === 'credit' ? cardName.trim() : '',
    };

    try {
      setIsSubmitting(true);
      const isEditing = Boolean(editingId);

      if (isEditing) {
        await updateTransaction(editingId as number, payload);
      } else {
        await createTransaction(payload);
      }

      resetForm();
      await fetchTransactions();

      return {
        success: true,
        message: isEditing
          ? 'Transação atualizada com sucesso.'
          : 'Transação criada com sucesso.',
      };
    } catch (error) {
      console.error('Erro ao salvar transação:', error);

      return {
        success: false,
        message: 'Não foi possível salvar a transação.',
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTransaction = async (
    id: number
  ): Promise<{ success: boolean; message: string }> => {
    try {
      setDeletingId(id);
      await removeTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));

      return {
        success: true,
        message: 'Transação deletada com sucesso.',
      };
    } catch (error) {
      console.error('Erro ao deletar transação:', error);

      return {
        success: false,
        message: 'Não foi possível deletar a transação.',
      };
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFavorite = async (id: number) => {
    try {
      setFavoriteLoadingId(id);
      const result = await toggleFavorite(id);

      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === id
            ? { ...transaction, favorite: Boolean(result.favorite) }
            : transaction
        )
      );
    } catch (error) {
      console.error('Erro ao favoritar transação:', error);
    } finally {
      setFavoriteLoadingId(null);
    }
  };

  const startEdit = (t: Transaction) => {
    setTitle(t.title);
    setAmount(t.amount.toString());
    setType(t.type);
    setCategory(t.category);
    setDate(t.date);
    setNotes(t.notes || '');
    setTagsInput((t.tags || []).join(', '));
    setPaymentMethod(t.paymentMethod || 'cash');
    setCardName(t.cardName || '');
    setFavorite(Boolean(t.favorite));
    setEditingId(t.id);
    setErrors({});
  };

  const cancelEdit = () => {
    resetForm();
  };

  const duplicateTransaction = (t: Transaction) => {
    setTitle(t.title);
    setAmount(t.amount.toString());
    setType(t.type);
    setCategory(t.category);
    setDate(getTodayDate());
    setNotes(t.notes || '');
    setTagsInput((t.tags || []).join(', '));
    setPaymentMethod(t.paymentMethod || 'cash');
    setCardName(t.cardName || '');
    setFavorite(Boolean(t.favorite));
    setEditingId(null);
    setErrors({});
  };

  return {
    transactions,
    title,
    setTitle,
    amount,
    setAmount,
    type,
    setType,
    category,
    setCategory,
    date,
    setDate,
    notes,
    setNotes,
    tagsInput,
    setTagsInput,
    paymentMethod,
    setPaymentMethod,
    cardName,
    setCardName,
    favorite,
    setFavorite,
    editingId,
    errors,
    isLoading,
    isSubmitting,
    deletingId,
    favoriteLoadingId,
    handleSubmit,
    deleteTransaction,
    handleToggleFavorite,
    startEdit,
    cancelEdit,
    duplicateTransaction,
  };
}