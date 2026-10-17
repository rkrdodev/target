import { TransactionTypes } from '@/utils/TransactionTypes';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/theme';
import { styles } from './styles';

export type TransactionProps = {
  id: string;
  value: string;
  date: string;
  description?: string;
  type: TransactionTypes;
};

type Props = {
  data: TransactionProps;
  onRemove: () => void;
};

export function Transaction({ data, onRemove }: Props) {
  const isInput = data.type === TransactionTypes.Input;

  return (
    <View style={styles.container}>
      <MaterialIcons
        name={isInput ? 'arrow-upward' : 'arrow-downward'}
        size={20}
        color={isInput ? colors.blue[500] : colors.red[400]}
      />
      <View style={styles.info}>
        <Text style={styles.value}>{data.value}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {data.date}
          {data.description ? ` • ${data.description}` : ''}
        </Text>
      </View>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Remover transação"
        activeOpacity={0.8}
        onPress={onRemove}
        hitSlop={8}
      >
        <MaterialIcons name="close" size={18} color={colors.gray[500]} />
      </TouchableOpacity>
    </View>
  );
}
