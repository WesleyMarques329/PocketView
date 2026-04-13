'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, RefreshCcw, Tags } from 'lucide-react';

import Header from '@/components/Header';
import SidebarDesktop from '@/components/SidebarDesktop';
import SearchBar from '@/components/SearchBar';
import SortSelect from '@/components/SortSelect';
import MonthFilter from '@/components/MonthFilter';
import TransactionList from '@/components/TransactionList';
import TransactionModal from '@/components/TransactionModal';
import NewTransactionButton from '@/components/NewTransactionButton';
import Toast from '@/components/Toast';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import ActiveFilters from '@/components/ActiveFilters';

import { useDarkMode } from '@/hooks/useDarkMode';
import { useTransactions } from '@/hooks/useTransactions';
import { useFinanceSummary } from '@/hooks/useFinanceSummary';

export default function TransactionsPage() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>(
    'all'
  );
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState<
    'all' | 'today' | '7d' | '30d'
  >('all');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    'all' | 'cash' | 'credit'
  >('all');
  const [selectedCardName, setSelectedCardName] = useState('all');
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error',
  });

  const { darkMode, setDarkMode } = useDarkMode();

  const {
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
  } = useTransactions();

  const {
    filteredTransactions,
    availableCategories,
    availableTags,
    availableCards,
    hasActiveFilters,
  } = useFinanceSummary(transactions, selectedMonth, search, sortBy, {}, {
    selectedType,
    selectedCategory,
    selectedPeriod,
    minAmount,
    maxAmount,
    selectedTags,
    selectedPaymentMethod,
    selectedCardName,
  });

  useEffect(() => {
    if (!toast.show) return;

    const timeout = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2500);

    return () => clearTimeout(timeout);
  }, [toast.show]);

  useEffect(() => {
    if (editingId !== null) {
      setIsTransactionModalOpen(true);
    }
  }, [editingId]);

  useEffect(() => {
    if (selectedPaymentMethod !== 'credit') {
      setSelectedCardName('all');
    }
  }, [selectedPaymentMethod]);

  const pageBg = darkMode
    ? 'bg-[radial-gradient(circle_at_top,_#1e293b,_#020617_60%)] text-white'
    : 'bg-[radial-gradient(circle_at_top,_#ffffff,_#e0f2fe_40%,_#e5e7eb_80%)] text-black';

  const shellBg = darkMode
    ? 'border border-white/10 bg-white/[0.04] backdrop-blur-2xl'
    : 'border border-white/70 bg-white/75 backdrop-blur-2xl';

  const mutedText = darkMode ? 'text-zinc-400' : 'text-gray-500';

  const softCard = darkMode
    ? 'border border-white/10 bg-white/[0.04] backdrop-blur-xl'
    : 'border border-white/70 bg-white/90 backdrop-blur-xl';

  const inputClass = darkMode
    ? 'border border-white/10 bg-white/5 text-white placeholder:text-zinc-500'
    : 'border border-sky-100 bg-white text-black placeholder:text-gray-400';

  const getCategoryAccent = (name: string) => {
    const map: Record<string, string> = {
      Alimentação: darkMode
        ? 'bg-sky-500/15 text-sky-300'
        : 'bg-sky-100 text-sky-700',
      Transporte: darkMode
        ? 'bg-sky-500/15 text-sky-300'
        : 'bg-sky-100 text-sky-700',
      Moradia: darkMode
        ? 'bg-sky-500/15 text-sky-300'
        : 'bg-sky-100 text-sky-700',
      Lazer: darkMode
        ? 'bg-sky-500/15 text-sky-300'
        : 'bg-sky-100 text-sky-700',
      Salário: darkMode
        ? 'bg-sky-500/15 text-sky-300'
        : 'bg-sky-100 text-sky-700',
      Outros: darkMode
        ? 'bg-zinc-500/15 text-zinc-300'
        : 'bg-gray-100 text-gray-700',
    };

    return map[name] || map['Outros'];
  };

  const chipBase = darkMode
    ? 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'
    : 'border-sky-100 bg-white text-gray-600 hover:bg-sky-50';

  const activeSky = darkMode
    ? 'border-sky-500/20 bg-sky-500/10 text-sky-300'
    : 'border-sky-200 bg-sky-50 text-sky-700';

  const activeRed = darkMode
    ? 'border-red-500/20 bg-red-500/10 text-red-300'
    : 'border-red-200 bg-red-50 text-red-700';

  const quickFilterButton = (
    active: boolean,
    color: 'sky' | 'red' | 'zinc'
  ) => {
    const activeMap: Record<string, string> = {
      sky: activeSky,
      red: activeRed,
      zinc: darkMode
        ? 'bg-white/10 text-white border-white/10'
        : 'bg-gray-100 text-gray-700 border-gray-200',
    };

    return active ? activeMap[color] : chipBase;
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const onSubmitTransaction = async (e: React.FormEvent) => {
    const result = await handleSubmit(e);

    setToast({
      show: true,
      message: result.message,
      type: result.success ? 'success' : 'error',
    });

    if (result.success) {
      setIsTransactionModalOpen(false);
    }
  };

  const askDelete = (id: number) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = async () => {
    if (pendingDeleteId === null) return;

    const result = await deleteTransaction(pendingDeleteId);

    setToast({
      show: true,
      message: result.message,
      type: result.success ? 'success' : 'error',
    });

    setPendingDeleteId(null);
  };

  const closeDeleteModal = () => {
    setPendingDeleteId(null);
  };

  const openNewTransactionModal = () => {
    cancelEdit();
    setIsTransactionModalOpen(true);
  };

  const closeTransactionModal = () => {
    cancelEdit();
    setIsTransactionModalOpen(false);
  };

  const resetFilters = () => {
    setSelectedMonth('');
    setSearch('');
    setSortBy('date-desc');
    setSelectedType('all');
    setSelectedCategory('all');
    setSelectedPeriod('all');
    setMinAmount('');
    setMaxAmount('');
    setSelectedTags([]);
    setSelectedPaymentMethod('all');
    setSelectedCardName('all');
  };

  const removeFilter = (
    filter:
      | 'month'
      | 'search'
      | 'type'
      | 'category'
      | 'period'
      | 'minAmount'
      | 'maxAmount'
      | 'tag'
      | 'paymentMethod'
      | 'cardName',
    value?: string
  ) => {
    switch (filter) {
      case 'month':
        setSelectedMonth('');
        break;
      case 'search':
        setSearch('');
        break;
      case 'type':
        setSelectedType('all');
        break;
      case 'category':
        setSelectedCategory('all');
        break;
      case 'period':
        setSelectedPeriod('all');
        break;
      case 'minAmount':
        setMinAmount('');
        break;
      case 'maxAmount':
        setMaxAmount('');
        break;
      case 'tag':
        if (value) {
          setSelectedTags((prev) => prev.filter((tag) => tag !== value));
        }
        break;
      case 'paymentMethod':
        setSelectedPaymentMethod('all');
        setSelectedCardName('all');
        break;
      case 'cardName':
        setSelectedCardName('all');
        break;
      default:
        break;
    }
  };

  return (
    <main className={`min-h-screen ${pageBg} px-4 py-6 md:px-6 xl:px-8`}>
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <ConfirmDeleteModal
        open={pendingDeleteId !== null}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        darkMode={darkMode}
      />

      <TransactionModal
        open={isTransactionModalOpen}
        onClose={closeTransactionModal}
        darkMode={darkMode}
        title={title}
        setTitle={setTitle}
        amount={amount}
        setAmount={setAmount}
        type={type}
        setType={setType}
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
        notes={notes}
        setNotes={setNotes}
        tagsInput={tagsInput}
        setTagsInput={setTagsInput}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        cardName={cardName}
        setCardName={setCardName}
        editingId={editingId}
        isSubmitting={isSubmitting}
        errors={errors}
        handleSubmit={onSubmitTransaction}
        cancelEdit={cancelEdit}
        mutedText={mutedText}
        softCard={softCard}
        inputClass={inputClass}
      />

      <div className="mx-auto flex w-full max-w-[1680px] gap-6">
        <SidebarDesktop darkMode={darkMode} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={`relative flex-1 overflow-hidden rounded-[36px] ${shellBg}`}
        >
          <div
            className={`pointer-events-none absolute -right-16 top-10 h-52 w-52 rounded-full blur-3xl ${
              darkMode ? 'bg-sky-400/10' : 'bg-sky-200/70'
            }`}
          />

          <div className="relative p-4 md:p-6 xl:p-8">
            <Header
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              mutedText={mutedText}
            />

            <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p
                  className={`text-[11px] font-medium uppercase tracking-[0.24em] ${mutedText}`}
                >
                  Workspace
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Transações
                </h2>
                <p className={`mt-2 text-sm ${mutedText}`}>
                  Busque, filtre e organize suas movimentações.
                </p>
              </div>

              <NewTransactionButton
                onClick={openNewTransactionModal}
                darkMode={darkMode}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_220px_220px]">
              <SearchBar
                search={search}
                setSearch={setSearch}
                mutedText={mutedText}
                softCard={softCard}
                inputClass={inputClass}
                darkMode={darkMode}
              />

              <MonthFilter
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                mutedText={mutedText}
                softCard={softCard}
                inputClass={inputClass}
                darkMode={darkMode}
              />

              <SortSelect
                sortBy={sortBy}
                setSortBy={setSortBy}
                mutedText={mutedText}
                softCard={softCard}
                inputClass={inputClass}
                darkMode={darkMode}
              />
            </div>

            <div className="mt-4">
              <ActiveFilters
                selectedMonth={selectedMonth}
                search={search}
                selectedType={selectedType}
                selectedCategory={selectedCategory}
                selectedPeriod={selectedPeriod}
                minAmount={minAmount}
                maxAmount={maxAmount}
                selectedTags={[
                  ...selectedTags,
                  ...(selectedPaymentMethod !== 'all'
                    ? [selectedPaymentMethod === 'credit' ? 'cartão' : 'dinheiro']
                    : []),
                  ...(selectedCardName !== 'all' ? [selectedCardName] : []),
                ]}
                hasActiveFilters={hasActiveFilters}
                darkMode={darkMode}
                mutedText={mutedText}
                onClearAll={resetFilters}
                onRemoveFilter={(filter, value) => {
                  if (value === 'cartão' || value === 'dinheiro') {
                    removeFilter('paymentMethod');
                    return;
                  }

                  if (value && availableCards.includes(value)) {
                    removeFilter('cardName');
                    return;
                  }

                  removeFilter(filter as Parameters<typeof removeFilter>[0], value);
                }}
              />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 2xl:grid-cols-[320px_minmax(0,1fr)]">
              <div className={`rounded-[32px] p-5 shadow-lg md:p-6 ${softCard}`}>
                <div className="mb-5">
                  <p
                    className={`text-[11px] font-medium uppercase tracking-[0.24em] ${mutedText}`}
                  >
                    Filtros
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    Refine sua visão
                  </h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className={`mb-2 text-xs font-medium ${mutedText}`}>Período</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedPeriod('all')}
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                          selectedPeriod === 'all',
                          'zinc'
                        )}`}
                      >
                        Tudo
                      </button>
                      <button
                        onClick={() => setSelectedPeriod('today')}
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                          selectedPeriod === 'today',
                          'sky'
                        )}`}
                      >
                        Hoje
                      </button>
                      <button
                        onClick={() => setSelectedPeriod('7d')}
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                          selectedPeriod === '7d',
                          'sky'
                        )}`}
                      >
                        7 dias
                      </button>
                      <button
                        onClick={() => setSelectedPeriod('30d')}
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                          selectedPeriod === '30d',
                          'sky'
                        )}`}
                      >
                        30 dias
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className={`mb-2 text-xs font-medium ${mutedText}`}>Tipo</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedType('all')}
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                          selectedType === 'all',
                          'zinc'
                        )}`}
                      >
                        Todos
                      </button>
                      <button
                        onClick={() => setSelectedType('income')}
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                          selectedType === 'income',
                          'sky'
                        )}`}
                      >
                        Receitas
                      </button>
                      <button
                        onClick={() => setSelectedType('expense')}
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                          selectedType === 'expense',
                          'red'
                        )}`}
                      >
                        Gastos
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className={`mb-2 text-xs font-medium ${mutedText}`}>
                      Categoria
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                          selectedCategory === 'all',
                          'zinc'
                        )}`}
                      >
                        Todas
                      </button>

                      {availableCategories.map((categoryName) => (
                        <button
                          key={categoryName}
                          onClick={() => setSelectedCategory(categoryName)}
                          className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                            selectedCategory === categoryName,
                            categoryName === 'Outros' ? 'zinc' : 'sky'
                          )}`}
                        >
                          {categoryName}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className={`mb-2 text-xs font-medium ${mutedText}`}>
                      Meio de pagamento
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedPaymentMethod('all')}
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                          selectedPaymentMethod === 'all',
                          'zinc'
                        )}`}
                      >
                        Todos
                      </button>
                      <button
                        onClick={() => setSelectedPaymentMethod('cash')}
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                          selectedPaymentMethod === 'cash',
                          'sky'
                        )}`}
                      >
                        Dinheiro / PIX
                      </button>
                      <button
                        onClick={() => setSelectedPaymentMethod('credit')}
                        className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                          selectedPaymentMethod === 'credit',
                          'sky'
                        )}`}
                      >
                        Cartão
                      </button>
                    </div>
                  </div>

                  {selectedPaymentMethod === 'credit' && availableCards.length > 0 && (
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <CreditCard
                          size={14}
                          className={darkMode ? 'text-zinc-300' : 'text-sky-600'}
                        />
                        <p className={`text-xs font-medium ${mutedText}`}>
                          Cartão específico
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedCardName('all')}
                          className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                            selectedCardName === 'all',
                            'zinc'
                          )}`}
                        >
                          Todos
                        </button>

                        {availableCards.map((card) => (
                          <button
                            key={card}
                            onClick={() => setSelectedCardName(card)}
                            className={`rounded-full border px-3 py-2 text-xs font-medium transition ${quickFilterButton(
                              selectedCardName === card,
                              'sky'
                            )}`}
                          >
                            {card}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className={`mb-2 text-xs font-medium ${mutedText}`}>
                      Faixa de valor
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                        placeholder="Mín."
                        className={`rounded-2xl p-3 text-sm outline-none transition ${inputClass}`}
                      />

                      <input
                        type="number"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                        placeholder="Máx."
                        className={`rounded-2xl p-3 text-sm outline-none transition ${inputClass}`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Tags
                        size={14}
                        className={darkMode ? 'text-zinc-300' : 'text-sky-600'}
                      />
                      <p className={`text-xs font-medium ${mutedText}`}>Tags</p>
                    </div>

                    {availableTags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {availableTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                              selectedTags.includes(tag) ? activeSky : chipBase
                            }`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className={`text-xs ${mutedText}`}>
                        Nenhuma tag cadastrada ainda.
                      </p>
                    )}
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={resetFilters}
                      className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium transition ${
                        darkMode
                          ? 'bg-white/10 text-zinc-200 hover:bg-white/15'
                          : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                      }`}
                    >
                      <RefreshCcw size={14} />
                      Limpar filtros
                    </button>
                  )}
                </div>
              </div>

              <TransactionList
                transactions={filteredTransactions}
                isLoading={isLoading}
                deletingId={deletingId}
                favoriteLoadingId={favoriteLoadingId}
                mutedText={mutedText}
                softCard={softCard}
                darkMode={darkMode}
                getCategoryAccent={getCategoryAccent}
                startEdit={startEdit}
                askDelete={askDelete}
                duplicateTransaction={duplicateTransaction}
                handleToggleFavorite={handleToggleFavorite}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}