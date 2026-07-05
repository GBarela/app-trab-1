import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../theme';

type QuantityStepperProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export default function QuantityStepper({ quantity, onDecrease, onIncrease }: QuantityStepperProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onDecrease} style={styles.button} hitSlop={10}>
        <Text style={styles.buttonText}>−</Text>
      </Pressable>
      <Text style={styles.quantity}>{quantity}</Text>
      <Pressable onPress={onIncrease} style={styles.button} hitSlop={10}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.xl,
    padding: spacing.xs,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '900',
    marginTop: -1,
  },
  quantity: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    minWidth: 32,
    textAlign: 'center',
  },
});