import { Button } from '@/components/Button';
import { CurrencyInput } from '@/components/CurrencyInput';
import { Input } from '@/components/Input';
import { PageHeader } from '@/components/PageHeader';
import { useTargets } from '@/data/TargetsProvider';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

export default function TargetForm() {
  const params = useLocalSearchParams<{ id?: string }>();
  const { goals, addGoal, updateGoal } = useTargets();
  const targetId = typeof params.id === 'string' ? params.id : undefined;
  const existingGoal = goals.find((goal) => goal.id === targetId);
  const [name, setName] = useState(existingGoal?.name ?? '');
  const [amount, setAmount] = useState<number | null>(existingGoal?.target ?? 0);

  useEffect(() => {
    setName(existingGoal?.name ?? '');
    setAmount(existingGoal?.target ?? 0);
  }, [existingGoal?.id, existingGoal?.name, existingGoal?.target]);

  const isValid = name.trim().length > 0 && amount !== null && amount > 0;

  function handleSave() {
    if (!isValid || amount === null) return;
    if (targetId && !existingGoal) {
      Alert.alert('Meta não encontrada', 'Volte e selecione uma meta válida.');
      return;
    }

    if (targetId) {
      updateGoal(targetId, name, amount);
    } else {
      addGoal(name, amount);
    }
    router.back();
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title={targetId ? 'Editar meta' : 'Meta'}
        subtitle="Economize para alcançar sua meta financeira."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nova meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
          value={name}
          onChangeText={setName}
          maxLength={80}
          returnKeyType="next"
        />
        <CurrencyInput
          label="Valor alvo"
          value={amount}
          onChangeValue={setAmount}
          maxValue={100000000}
        />
        <Button
          title="Salvar"
          onPress={handleSave}
          disabled={!isValid || (Boolean(targetId) && !existingGoal)}
        />
      </View>
    </View>
  );
}
