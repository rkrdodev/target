import { colors } from '@/theme';
import CurrencyInputField, {
  CurrencyInputProps as NativeCurrencyInputProps,
} from 'react-native-currency-input';
import { Text, View } from 'react-native';
import { styles } from './styles';

type Props = NativeCurrencyInputProps & {
  label: string;
};

export function CurrencyInput({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <CurrencyInputField
        accessibilityLabel={label}
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        {...rest}
      />
    </View>
  );
}
