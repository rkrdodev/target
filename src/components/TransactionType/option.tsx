import { colors } from '@/theme';
import { MaterialIcons } from '@expo/vector-icons';
import {
  ColorValue,
  Pressable,
  PressableProps,
  Text,
} from 'react-native';
import { styles } from './styles';

type Props = PressableProps & {
  isSelected: boolean;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  selectedColor: ColorValue;
};

export function Option({
  isSelected,
  title,
  icon,
  selectedColor,
  ...rest
}: Props) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{
        selected: isSelected,
        disabled: rest.disabled ?? false,
      }}
      style={[
        styles.option,
        isSelected && { backgroundColor: selectedColor, borderColor: selectedColor },
      ]}
      {...rest}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isSelected ? colors.white : colors.gray[500]}
      />
      <Text style={[styles.title, isSelected && { color: colors.white }]}>
        {title}
      </Text>
    </Pressable>
  );
}
