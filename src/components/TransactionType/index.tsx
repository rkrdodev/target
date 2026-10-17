import { TransactionTypes } from '@/utils/TransactionTypes';
import { colors } from '@/theme';
import { Text, View } from 'react-native';
import { Option } from './option';
import { styles } from './styles';

type Props = {
  value: TransactionTypes;
  onChange: (value: TransactionTypes) => void;
};

export function TransactionType({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tipo</Text>
      <View style={styles.options} accessibilityRole="radiogroup">
        <Option
          isSelected={value === TransactionTypes.Input}
          title="Guardar"
          icon="arrow-upward"
          selectedColor={colors.blue[500]}
          onPress={() => onChange(TransactionTypes.Input)}
        />
        <Option
          isSelected={value === TransactionTypes.Output}
          title="Resgatar"
          icon="arrow-downward"
          selectedColor={colors.red[400]}
          onPress={() => onChange(TransactionTypes.Output)}
        />
      </View>
    </View>
  );
}
