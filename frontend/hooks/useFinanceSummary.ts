'use client';

import { useMemo } from 'react';
import { Transaction } from '@/types/transaction';

function formatMonthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getPreviousMonth(monthKey: string) {
  const [year, month] = monthKey.split('-').map(Number);
  const date = new Date(year, month - 2, 1);
  return formatMonthKey(date);
}

function getMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split('-').map(Number);
  const date = new Date(year, month - 1, 1);

  return date.toLocaleDateString('pt-BR', {
    month: 'short',
  });
}

function parseTransactionDate(date: string) {
  return new Date(`${date}T00:00:00`);
}

const ESSENTIAL_KEYWORDS = [
  'essencial',
  'fixo',
  'moradia',
  'aluguel',
  'mercado',
  'supermercado',
  'farmacia',
  'saude',
  'transporte',
  'conta',
  'luz',
  'agua',
  'internet',
  'academia',
  'cartao',
];

function isEssentialTransaction(transaction: Transaction) {
  const content = [transaction.category, ...(transaction.tags || [])]
    .join(' ')
    .toLowerCase();

  return ESSENTIAL_KEYWORDS.some((keyword) => content.includes(keyword));
}

interface FinanceSummaryOptions {
  selectedType?: 'all' | 'income' | 'expense';
  selectedCategory?: string;
  selectedPeriod?: 'all' | 'today' | '7d' | '30d';
  minAmount?: string;
  maxAmount?: string;
  selectedTags?: string[];
  selectedPaymentMethod?: 'all' | 'cash' | 'credit';
  selectedCardName?: string;
}

export function useFinanceSummary(
  transactions: Transaction[],
  selectedMonth: string,
  search: string,
  sortBy: string,
  categoryGoals: Record<string, string>,
  options: FinanceSummaryOptions = {}
) {
  const {
    selectedType = 'all',
    selectedCategory = 'all',
    selectedPeriod = 'all',
    minAmount = '',
    maxAmount = '',
    selectedTags = [],
    selectedPaymentMethod = 'all',
    selectedCardName = 'all',
  } = options;

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (selectedMonth) {
      result = result.filter((t) => t.date.startsWith(selectedMonth));
    }

    if (search.trim()) {
      const term = search.toLowerCase().trim();

      result = result.filter((t) => {
        return (
          t.title.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term) ||
          t.type.toLowerCase().includes(term) ||
          (t.notes || '').toLowerCase().includes(term) ||
          (t.tags || []).some((tag) => tag.toLowerCase().includes(term)) ||
          (t.cardName || '').toLowerCase().includes(term)
        );
      });
    }

    if (selectedType !== 'all') {
      result = result.filter((t) => t.type === selectedType);
    }

    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.category === selectedCategory);
    }

    if (selectedPeriod !== 'all') {
      const today = new Date();
      const todayStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      result = result.filter((t) => {
        const transactionDate = parseTransactionDate(t.date);

        if (selectedPeriod === 'today') {
          return transactionDate.getTime() === todayStart.getTime();
        }

        if (selectedPeriod === '7d') {
          const sevenDaysAgo = new Date(todayStart);
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
          return transactionDate >= sevenDaysAgo && transactionDate <= todayStart;
        }

        if (selectedPeriod === '30d') {
          const thirtyDaysAgo = new Date(todayStart);
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
          return transactionDate >= thirtyDaysAgo && transactionDate <= todayStart;
        }

        return true;
      });
    }

    if (minAmount.trim()) {
      const min = Number(minAmount);
      if (!Number.isNaN(min)) {
        result = result.filter((t) => t.amount >= min);
      }
    }

    if (maxAmount.trim()) {
      const max = Number(maxAmount);
      if (!Number.isNaN(max)) {
        result = result.filter((t) => t.amount <= max);
      }
    }

    if (selectedTags.length > 0) {
      result = result.filter((t) => {
        const normalizedTags = (t.tags || []).map((tag) => tag.toLowerCase());
        return selectedTags.every((tag) => normalizedTags.includes(tag.toLowerCase()));
      });
    }

    if (selectedPaymentMethod !== 'all') {
      result = result.filter((t) => t.paymentMethod === selectedPaymentMethod);
    }

    if (selectedCardName !== 'all') {
      result = result.filter((t) => t.cardName === selectedCardName);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'amount-asc':
          return a.amount - b.amount;
        case 'amount-desc':
          return b.amount - a.amount;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return result;
  }, [
    transactions,
    selectedMonth,
    search,
    sortBy,
    selectedType,
    selectedCategory,
    selectedPeriod,
    minAmount,
    maxAmount,
    selectedTags,
    selectedPaymentMethod,
    selectedCardName,
  ]);

  const income = useMemo(() => {
    return filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
  }, [filteredTransactions]);

  const expense = useMemo(() => {
    return filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
  }, [filteredTransactions]);

  const balance = income - expense;

  const expenseTransactions = useMemo(() => {
    return filteredTransactions.filter((t) => t.type === 'expense');
  }, [filteredTransactions]);

  const creditTransactions = useMemo(() => {
    return filteredTransactions.filter((t) => t.paymentMethod === 'credit');
  }, [filteredTransactions]);

  const creditExpenseTransactions = useMemo(() => {
    return filteredTransactions.filter(
      (t) => t.paymentMethod === 'credit' && t.type === 'expense'
    );
  }, [filteredTransactions]);

  const categorySummary = useMemo(() => {
    const grouped: Record<string, number> = {};

    expenseTransactions.forEach((t) => {
      grouped[t.category] = (grouped[t.category] || 0) + t.amount;
    });

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [expenseTransactions]);

  const tagSummary = useMemo(() => {
    const grouped: Record<string, number> = {};

    expenseTransactions.forEach((t) => {
      (t.tags || []).forEach((tag) => {
        grouped[tag] = (grouped[tag] || 0) + t.amount;
      });
    });

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [expenseTransactions]);

  const cardSummary = useMemo(() => {
    const grouped: Record<string, number> = {};

    creditExpenseTransactions.forEach((t) => {
      const card = t.cardName?.trim() || 'Cartão';
      grouped[card] = (grouped[card] || 0) + t.amount;
    });

    return Object.entries(grouped)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);
  }, [creditExpenseTransactions]);

  const maxCategoryValue =
    categorySummary.length > 0
      ? Math.max(...categorySummary.map((i) => i.value))
      : 0;

  const totalTransactions = filteredTransactions.length;

  const biggestExpense =
    expenseTransactions.length > 0
      ? Math.max(...expenseTransactions.map((t) => t.amount))
      : 0;

  const averageExpense =
    expenseTransactions.length > 0
      ? expenseTransactions.reduce((acc, t) => acc + t.amount, 0) /
        expenseTransactions.length
      : 0;

  const topExpenseCategory =
    categorySummary.length > 0 ? categorySummary[0].name : 'Nenhuma';

  const topTag = tagSummary.length > 0 ? tagSummary[0].name : 'Nenhuma';

  const topCard = cardSummary.length > 0 ? cardSummary[0].name : 'Nenhum';

  const totalCreditExpense = creditExpenseTransactions.reduce(
    (acc, t) => acc + t.amount,
    0
  );

  const creditExpensePercentage =
    expense > 0 ? (totalCreditExpense / expense) * 100 : 0;

  const referenceMonth = selectedMonth || formatMonthKey(new Date());
  const previousMonth = getPreviousMonth(referenceMonth);

  const currentMonthTransactions = transactions.filter((t) =>
    t.date.startsWith(referenceMonth)
  );

  const previousMonthTransactions = transactions.filter((t) =>
    t.date.startsWith(previousMonth)
  );

  const currentExpense = currentMonthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const previousExpense = previousMonthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const currentIncome = currentMonthTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const previousIncome = previousMonthTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const previousBalance = previousIncome - previousExpense;
  
  const currentCreditExpense = currentMonthTransactions
    .filter((t) => t.type === 'expense' && t.paymentMethod === 'credit')
    .reduce((acc, t) => acc + t.amount, 0);

  const previousCreditExpense = previousMonthTransactions
    .filter((t) => t.type === 'expense' && t.paymentMethod === 'credit')
    .reduce((acc, t) => acc + t.amount, 0);

  const monthlyTrendData = useMemo(() => {
    const grouped: Record<
      string,
      { month: string; income: number; expense: number; credit: number }
    > = {};

    transactions.forEach((t) => {
      const monthKey = t.date.slice(0, 7);

      if (!grouped[monthKey]) {
        grouped[monthKey] = {
          month: monthKey,
          income: 0,
          expense: 0,
          credit: 0,
        };
      }

      if (t.type === 'income') {
        grouped[monthKey].income += t.amount;
      } else {
        grouped[monthKey].expense += t.amount;

        if (t.paymentMethod === 'credit') {
          grouped[monthKey].credit += t.amount;
        }
      }
    });

    return Object.values(grouped)
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6)
      .map((item) => ({
        ...item,
        month: getMonthLabel(item.month),
      }));
  }, [transactions]);

  const categoryGoalsSummary = useMemo(() => {
    return categorySummary.map((item) => {
      const goal = Number(categoryGoals[item.name] || 0);
      const percent = goal > 0 ? (item.value / goal) * 100 : 0;

      return {
        name: item.name,
        spent: item.value,
        goal,
        percent,
      };
    });
  }, [categorySummary, categoryGoals]);

  const currentMonthExpenseTransactions = currentMonthTransactions.filter(
    (t) => t.type === 'expense'
  );

  const daysWithExpenseData = new Set(
    currentMonthExpenseTransactions.map((t) => t.date)
  ).size;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth();
  const daysInCurrentMonth = new Date(
    currentYear,
    currentMonthIndex + 1,
    0
  ).getDate();
  const currentDayOfMonth = today.getDate();

  const projectedMonthExpense =
    currentMonthTransactions.length > 0 && currentDayOfMonth > 0
      ? (currentExpense / currentDayOfMonth) * daysInCurrentMonth
      : 0;

  const projectedCreditExpense =
    currentMonthTransactions.length > 0 && currentDayOfMonth > 0
      ? (currentCreditExpense / currentDayOfMonth) * daysInCurrentMonth
      : 0;

  const spendingTrendPercentage =
    previousExpense > 0
      ? ((currentExpense - previousExpense) / previousExpense) * 100
      : 0;

  const spendingTrendLabel =
    previousExpense === 0
      ? 'sem-base'
      : spendingTrendPercentage > 8
      ? 'subindo'
      : spendingTrendPercentage < -8
      ? 'caindo'
      : 'estavel';

  const highSpendingAlert =
    previousExpense > 0 && currentExpense > previousExpense * 1.2;

  const creditTrendPercentage =
    previousCreditExpense > 0
      ? ((currentCreditExpense - previousCreditExpense) / previousCreditExpense) * 100
      : 0;

  const essentialExpense = expenseTransactions
    .filter(isEssentialTransaction)
    .reduce((acc, t) => acc + t.amount, 0);

  const nonEssentialExpense = expenseTransactions
    .filter((transaction) => !isEssentialTransaction(transaction))
    .reduce((acc, t) => acc + t.amount, 0);

  const smartInsights = useMemo(() => {
    const insights: string[] = [];

    if (currentExpense > previousExpense && previousExpense > 0) {
      const diff = ((currentExpense - previousExpense) / previousExpense) * 100;
      insights.push(
        `Seus gastos do período estão ${diff.toFixed(
          0
        )}% acima do mês anterior.`
      );
    }

    if (currentExpense < previousExpense && previousExpense > 0) {
      const diff = ((previousExpense - currentExpense) / previousExpense) * 100;
      insights.push(
        `Você conseguiu reduzir seus gastos em ${diff.toFixed(
          0
        )}% em relação ao mês anterior.`
      );
    }

    if (topExpenseCategory !== 'Nenhuma' && categorySummary.length > 0) {
      const topValue = categorySummary[0].value;
      insights.push(
        `Sua categoria com maior gasto foi ${topExpenseCategory}, totalizando R$ ${topValue.toFixed(
          2
        )}.`
      );
    }

    if (topTag !== 'Nenhuma' && tagSummary.length > 0) {
      insights.push(
        `A tag mais pesada no período foi #${topTag}, somando R$ ${tagSummary[0].value.toFixed(
          2
        )}.`
      );
    }

    if (topCard !== 'Nenhum' && cardSummary.length > 0) {
      insights.push(
        `Seu cartão mais pesado no período foi ${topCard}, com R$ ${cardSummary[0].total.toFixed(
          2
        )}.`
      );
    }

    if (creditExpensePercentage > 0) {
      insights.push(
        `${creditExpensePercentage.toFixed(
          0
        )}% dos seus gastos do período estão no cartão.`
      );
    }

    if (averageExpense > 0) {
      insights.push(
        `Seu gasto médio por transação ficou em R$ ${averageExpense.toFixed(2)}.`
      );
    }

    if (income > 0 && expense > 0) {
      const ratio = (expense / income) * 100;
      insights.push(
        `Você usou ${ratio.toFixed(
          0
        )}% da sua receita atual em despesas no período filtrado.`
      );
    }

    if (projectedMonthExpense > 0) {
      insights.push(
        `Mantendo o ritmo atual, sua projeção de gastos para o mês é de R$ ${projectedMonthExpense.toFixed(
          2
        )}.`
      );
    }

    if (projectedCreditExpense > 0) {
      insights.push(
        `Se o ritmo atual continuar, sua fatura projetada de cartão chega a R$ ${projectedCreditExpense.toFixed(
          2
        )}.`
      );
    }

    if (essentialExpense > 0 || nonEssentialExpense > 0) {
      insights.push(
        `Seus gastos essenciais estão em R$ ${essentialExpense.toFixed(
          2
        )} e os não essenciais em R$ ${nonEssentialExpense.toFixed(2)}.`
      );
    }

    const exceededCategory = categoryGoalsSummary.find(
      (item) => item.goal > 0 && item.spent > item.goal
    );

    if (exceededCategory) {
      insights.push(
        `A categoria ${exceededCategory.name} ultrapassou a meta em R$ ${(
          exceededCategory.spent - exceededCategory.goal
        ).toFixed(2)}.`
      );
    }

    return insights.slice(0, 7);
  }, [
    currentExpense,
    previousExpense,
    topExpenseCategory,
    categorySummary,
    topTag,
    tagSummary,
    topCard,
    cardSummary,
    creditExpensePercentage,
    averageExpense,
    income,
    expense,
    projectedMonthExpense,
    projectedCreditExpense,
    essentialExpense,
    nonEssentialExpense,
    categoryGoalsSummary,
  ]);

  const availableCategories = useMemo(() => {
    const categories = Array.from(new Set(transactions.map((t) => t.category)));
    return categories.sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  const availableTags = useMemo(() => {
    const tags = Array.from(
      new Set(transactions.flatMap((transaction) => transaction.tags || []))
    );

    return tags.sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  const availableCards = useMemo(() => {
    const cards = Array.from(
      new Set(
        transactions
          .map((transaction) => transaction.cardName?.trim())
          .filter(Boolean)
      )
    ) as string[];

    return cards.sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  const hasActiveFilters =
    Boolean(selectedMonth) ||
    Boolean(search.trim()) ||
    sortBy !== 'date-desc' ||
    selectedType !== 'all' ||
    selectedCategory !== 'all' ||
    selectedPeriod !== 'all' ||
    Boolean(minAmount.trim()) ||
    Boolean(maxAmount.trim()) ||
    selectedTags.length > 0 ||
    selectedPaymentMethod !== 'all' ||
    selectedCardName !== 'all';

  return {
    filteredTransactions,
    income,
    expense,
    balance,
    previousBalance,
    categorySummary,
    tagSummary,
    cardSummary,
    maxCategoryValue,
    totalTransactions,
    biggestExpense,
    averageExpense,
    topExpenseCategory,
    topTag,
    topCard,
    totalCreditExpense,
    creditExpensePercentage,
    currentExpense,
    previousExpense,
    currentIncome,
    previousIncome,
    currentCreditExpense,
    previousCreditExpense,
    monthlyTrendData,
    categoryGoalsSummary,
    smartInsights,
    availableCategories,
    availableTags,
    availableCards,
    hasActiveFilters,
    projectedMonthExpense,
    projectedCreditExpense,
    spendingTrendPercentage,
    spendingTrendLabel,
    highSpendingAlert,
    creditTrendPercentage,
    essentialExpense,
    nonEssentialExpense,
    daysWithExpenseData,
    creditTransactions,
    creditExpenseTransactions,
  };
}