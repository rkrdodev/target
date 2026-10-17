import { Button } from '@/components/Button';
import { List } from '@/components/List';
import { PageHeader } from '@/components/PageHeader';
import { Progress } from '@/components/Progress';
import { Transaction, TransactionProps } from '@/components/Transaction';
import { useTargets } from '@/data/TargetsProvider';
import { formatCurrency } from '@/utils/currency';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, Text, View } from 'react-native';
import { colors, fontsFamily } from '@/theme';

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();
  const goalId = typeof params.id === 'string' ? params.id : '';
  const { goals, removeTransaction } = useTargets();
  const goal = goals.find((item) => item.id === goalId);

  if (!goal) {
    return (
      <View style={{ flex: 1, padding: 24 }}>
        <PageHeader title="Meta não encontrada" />
        <Text
          style={{
            marginTop: 24,
            color: colors.gray[600],
            fontFamily: fontsFamily.regular,
          }}
        >
          Esta meta não existe mais ou o link está inválido.
        </Text>
      </View>
    );
  }

  const currentGoal = goal;
  const transactions: TransactionProps[] = goal.transactions.map((item) => ({
    ...item,
    value: formatCurrency(item.value),
  }));
  const percentage =
    goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0;

  function confirmRemove(transaction: TransactionProps) {
    Alert.alert(
      'Remover transação?',
      'O saldo da meta será atualizado.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => removeTransaction(currentGoal.id, transaction.id),
        },
      ],
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={goal.name}
        rightButton={{
          icon: 'edit',
          accessibilityLabel: 'Editar meta',
          onPress: () => router.navigate(`/target?id=${goal.id}`),
        }}
      />
      <Progress
        data={{
          current: formatCurrency(goal.current),
          target: formatCurrency(goal.target),
          percentage,
        }}
      />
      <List
        title="Transações"
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => confirmRemove(item)} />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
      />
      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${goal.id}`)}
      />
    </View>
  );
}
