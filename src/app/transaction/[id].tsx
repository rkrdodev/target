import { Button } from '@/components/Button';
import { CurrencyInput } from '@/components/CurrencyInput';
import { Input } from '@/components/Input';
import { PageHeader } from '@/components/PageHeader';
import { TransactionType } from '@/components/TransactionType';
import { useTargets } from '@/data/TargetsProvider';
import { TransactionTypes } from '@/utils/TransactionTypes';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, View } from 'react-native';

export default function NewTransaction() {
  const params = useLocalSearchParams<{ id: string }>();
  const goalId = typeof params.id === 'string' ? params.id : '';
  const { goals, addTransaction } = useTargets();
  const goal = goals.find((item) => item.id === goalId);
  const [amount, setAmount] = useState<number | null>(0);
  const [description, setDescription] = useState('');
  const [type, setType] = useState(TransactionTypes.Input);
  const isValid = Boolean(goal) && amount !== null && amount > 0;

  function handleSave() {
    if (!goal || amount === null || amount <= 0) return;

    try {
      addTransaction(goal.id, {
        value: amount,
        description: description.trim() || undefined,
        type,
      });
      router.back();
    } catch (error) {
      Alert.alert(
        'Não foi possível salvar',
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao salvar a transação.',
      );
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova transação"
        subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType value={type} onChange={setType} />
        <CurrencyInput
          label="Valor (R$)"
          value={amount}
          onChangeValue={setAmount}
          maxValue={100000000}
        />
        <Input
          label="Motivo"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
          value={description}
          onChangeText={setDescription}
          maxLength={120}
          returnKeyType="done"
        />
        <Button
          title="Salvar"
          onPress={handleSave}
          disabled={!isValid}
        />
      </View>
    </View>
  );
}
