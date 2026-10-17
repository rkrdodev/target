import { TransactionTypes } from '@/utils/TransactionTypes';
import React, { createContext, useContext, useMemo, useState } from 'react';

export type GoalTransaction = {
  id: string;
  value: number;
  date: string;
  description?: string;
  type: TransactionTypes;
};

export type Goal = {
  id: string;
  name: string;
  target: number;
  current: number;
  transactions: GoalTransaction[];
};

type TargetsContextValue = {
  goals: Goal[];
  addGoal: (name: string, target: number) => Goal;
  updateGoal: (id: string, name: string, target: number) => void;
  addTransaction: (
    goalId: string,
    transaction: Omit<GoalTransaction, 'id' | 'date'>,
  ) => void;
  removeTransaction: (goalId: string, transactionId: string) => void;
};

const initialGoals: Goal[] = [
  {
    id: '1',
    name: 'Apple Watch',
    target: 1790,
    current: 580,
    transactions: [
      { id: '1', value: 20, date: '12/04/25', type: TransactionTypes.Output },
      {
        id: '2',
        value: 300,
        date: '12/04/25',
        description: 'CDB de 110% no banco XPTO',
        type: TransactionTypes.Input,
      },
    ],
  },
  {
    id: '2',
    name: 'Comprar uma cadeira ergonômica',
    target: 1200,
    current: 900,
    transactions: [],
  },
  {
    id: '3',
    name: 'Comprar uma cadeira ergonômica',
    target: 3000,
    current: 1200,
    transactions: [],
  },
];

const TargetsContext = createContext<TargetsContextValue | null>(null);

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function TargetsProvider({ children }: React.PropsWithChildren) {
  const [goals, setGoals] = useState(initialGoals);

  const value = useMemo<TargetsContextValue>(
    () => ({
      goals,
      addGoal(name, target) {
        const goal = {
          id: createId(),
          name: name.trim(),
          target,
          current: 0,
          transactions: [],
        };
        setGoals((current) => [...current, goal]);
        return goal;
      },
      updateGoal(id, name, target) {
        setGoals((current) =>
          current.map((goal) =>
            goal.id === id ? { ...goal, name: name.trim(), target } : goal,
          ),
        );
      },
      addTransaction(goalId, transaction) {
        if (!Number.isFinite(transaction.value) || transaction.value <= 0) {
          throw new Error('O valor da transação deve ser maior que zero.');
        }

        const goal = goals.find((item) => item.id === goalId);
        if (!goal) {
          throw new Error('A meta selecionada não foi encontrada.');
        }
        if (
          transaction.type === TransactionTypes.Output &&
          transaction.value > goal.current
        ) {
          throw new Error('O valor a retirar não pode superar o valor guardado.');
        }

        const entry: GoalTransaction = {
          ...transaction,
          id: createId(),
          date: new Date().toLocaleDateString('pt-BR'),
        };
        const adjustment =
          transaction.type === TransactionTypes.Input
            ? transaction.value
            : -transaction.value;

        setGoals((current) =>
          current.map((item) =>
            item.id === goalId
              ? {
                  ...item,
                  current: item.current + adjustment,
                  transactions: [entry, ...item.transactions],
                }
              : item,
          ),
        );
      },
      removeTransaction(goalId, transactionId) {
        setGoals((current) =>
          current.map((goal) => {
            if (goal.id !== goalId) return goal;

            const transaction = goal.transactions.find(
              (item) => item.id === transactionId,
            );
            if (!transaction) return goal;

            const adjustment =
              transaction.type === TransactionTypes.Input
                ? -transaction.value
                : transaction.value;
            return {
              ...goal,
              current: goal.current + adjustment,
              transactions: goal.transactions.filter(
                (item) => item.id !== transactionId,
              ),
            };
          }),
        );
      },
    }),
    [goals],
  );

  return (
    <TargetsContext.Provider value={value}>{children}</TargetsContext.Provider>
  );
}

export function useTargets() {
  const context = useContext(TargetsContext);
  if (!context) {
    throw new Error('useTargets deve ser usado dentro de TargetsProvider.');
  }
  return context;
}
