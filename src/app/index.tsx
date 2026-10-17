import { Button } from '@/components/Button';
import { HomeHeader } from '@/components/HomeHeader';
import { List } from '@/components/List';
import { Target } from '@/components/Target';
import { useTargets } from '@/data/TargetsProvider';
import { formatCurrency } from '@/utils/currency';
import { router } from 'expo-router';
import { View } from 'react-native';

const summary = {
  input: { label: 'Entradas', value: 'R$ 6.184,90' },
  output: { label: 'Saídas', value: 'R$ 883,65' },
};

export default function Index() {
  const { goals } = useTargets();
  const total = goals.reduce((sum, goal) => sum + goal.current, 0);

  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={{ ...summary, total: formatCurrency(total) }} />
      <List
        title="Metas"
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={{
              id: item.id,
              name: item.name,
              percentage:
                item.target > 0
                  ? `${Math.min((item.current / item.target) * 100, 100).toFixed(0)}%`
                  : '0%',
              current: formatCurrency(item.current),
              target: formatCurrency(item.target),
            }}
            accessibilityRole="button"
            accessibilityLabel={`Abrir meta ${item.name}`}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta. Toque em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24 }}
      />
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate('/target')} />
      </View>
    </View>
  );
}
