import { Transaction } from '@/types/transaction';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const API_URL = `${API_BASE_URL}/transactions`;

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

export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error('Erro ao buscar transações');
  }

  return res.json();
}

export async function createTransaction(
  payload: TransactionPayload
): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Erro ao criar transação');
  }
}

export async function updateTransaction(
  id: number,
  payload: TransactionPayload
): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Erro ao atualizar transação');
  }
}

export async function removeTransaction(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Erro ao deletar transação');
  }
}

export async function toggleFavorite(id: number) {
  const res = await fetch(`${API_URL}/${id}/favorite`, {
    method: 'PATCH',
  });

  if (!res.ok) {
    throw new Error('Erro ao favoritar transação');
  }

  return res.json();
}