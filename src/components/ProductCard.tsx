import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Product } from '../types/product';
import { colors, radius, shadow, spacing } from '../theme';

type ProductCardProps = {
  product: Product;
  onPress: () => void;
  compact?: boolean;
};

export default function ProductCard({ product, onPress, compact = false }: ProductCardProps) {
  const imageSource = typeof product.image === 'string' ? { uri: product.image } : product.image;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, compact && styles.compactCard, pressed && styles.pressed]}
    >
      <Image source={imageSource} style={[styles.image, compact && styles.compactImage]} />
      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Text style={styles.badge}>{product.badge ?? product.category}</Text>
          <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {product.subtitle}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
          {product.oldPrice ? (
            <Text style={styles.oldPrice}>
              {product.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    width: '48%',
    marginBottom: spacing.lg,
    shadowColor: shadow.color,
    shadowOffset: shadow.offset,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    elevation: shadow.elevation,
  },
  compactCard: {
    width: '100%',
    marginBottom: 0,
  },
  pressed: {
    opacity: 0.93,
    transform: [{ scale: 0.99 }],
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: colors.surfaceAlt,
  },
  compactImage: {
    height: 120,
  },
  content: {
    padding: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  badge: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  rating: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
    minHeight: 32,
    marginBottom: spacing.sm,
  },
  priceRow: {
    gap: 4,
  },
  price: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  oldPrice: {
    color: colors.textMuted,
    fontSize: 11,
    textDecorationLine: 'line-through',
  },
});