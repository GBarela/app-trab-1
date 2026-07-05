import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import { CartItem } from '../types/product';
import QuantityStepper from './QuantityStepper';
import { colors, radius, spacing } from '../theme';

type CartItemRowProps = {
  item: CartItem;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
};

export default function CartItemRow({ item, onDecrease, onIncrease, onRemove }: CartItemRowProps) {
  const { product, quantity } = item;
  const subtotal = product.price * quantity;
  const imageSource: ImageSourcePropType =
    typeof product.image === 'string' ? { uri: product.image } : product.image;

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.textBlock}>
            <Text style={styles.title} numberOfLines={2}>
              {product.title}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {product.subtitle}
            </Text>
          </View>
          <Pressable onPress={onRemove} hitSlop={10}>
            <Text style={styles.remove}>Remover</Text>
          </Pressable>
        </View>

        <View style={styles.bottomRow}>
          <QuantityStepper quantity={quantity} onDecrease={onDecrease} onIncrease={onIncrease} />
          <View style={styles.priceBlock}>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.price}>
              {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  remove: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '800',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  subtotalLabel: {
    color: colors.textMuted,
    fontSize: 11,
    marginBottom: 2,
  },
  price: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
});