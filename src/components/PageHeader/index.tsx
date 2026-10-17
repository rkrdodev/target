import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/theme';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

type Props = {
  title: string;
  subtitle?: string;
  rightButton?: {
    onPress: () => void;
    icon: keyof typeof MaterialIcons.glyphMap;
    accessibilityLabel?: string;
  };
};

export function PageHeader({ title, subtitle, rightButton }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          activeOpacity={0.8}
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        {rightButton && (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={rightButton.accessibilityLabel ?? 'Ação'}
            activeOpacity={0.8}
            onPress={rightButton.onPress}
            style={styles.iconButton}
          >
            <MaterialIcons
              name={rightButton.icon}
              size={24}
              color={colors.gray[500]}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}
