import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Image, ImageSourcePropType, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';
import { useCart } from '../context/CartContext';
import { products, productLookup } from '../data/products';
import { AppStackParamList } from '../navigation/types';
import { colors, radius, shadow, spacing } from '../theme';

type Props = NativeStackScreenProps<AppStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen({ route, navigation }: Props) {
  const { productId } = route.params;
  const product = productLookup[productId];
  const { addToCart } = useCart();
  const imageSource: ImageSourcePropType =
    typeof product.image === 'string' ? { uri: product.image } : product.image;

  if (!product) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.emptyTitle}>Produto não encontrado</Text>
        <Pressable style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Voltar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const relatedProducts = products.filter((item) => item.id !== product.id).slice(0, 2);

  const handleBuyNow = () => {
    addToCart(product);
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.heroImageWrap}>
          <Image source={imageSource} style={styles.heroImage} />
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>{product.badge ?? 'Oferta especial'}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.subtitle}>{product.subtitle}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
            <Text style={styles.reviews}>{product.reviews.toLocaleString('pt-BR')} avaliações</Text>
          </View>

          <View style={styles.priceBlock}>
            <Text style={styles.price}>
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
            {product.oldPrice ? (
              <Text style={styles.oldPrice}>
                {product.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Text>
            ) : null}
            <Text style={styles.installments}>{product.installments}</Text>
          </View>

          <View style={styles.descriptionBlock}>
            <SectionHeader title="Sobre o produto" />
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.featureList}>
            {product.highlights.map((highlight) => (
              <View key={highlight} style={styles.featureChip}>
                <Text style={styles.featureText}>{highlight}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.secondaryButtonText}>Continuar vendo</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={handleBuyNow}>
              <Text style={styles.primaryButtonText}>Adicionar e ir ao carrinho</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.relatedSection}>
          <SectionHeader title="Você também pode gostar" />
          <FlatList
            data={relatedProducts}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
            renderItem={({ item }) => (
              <View style={styles.relatedCardWrap}>
                <ProductCard
                  product={item}
                  compact
                  onPress={() => navigation.push('ProductDetails', { productId: item.id })}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  heroImageWrap: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  heroImage: {
    width: '100%',
    height: 280,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceAlt,
  },
  heroBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.accent,
    borderRadius: radius.xl,
  },
  heroBadgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '900',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    shadowColor: shadow.color,
    shadowOffset: shadow.offset,
    shadowOpacity: shadow.opacity,
    shadowRadius: shadow.radius,
    elevation: shadow.elevation,
  },
  category: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  rating: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '900',
  },
  reviews: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  priceBlock: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  price: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
  },
  oldPrice: {
    color: colors.textMuted,
    fontSize: 14,
    textDecorationLine: 'line-through',
    marginTop: spacing.xs,
  },
  installments: {
    color: colors.success,
    fontSize: 14,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  descriptionBlock: {
    marginTop: spacing.xl,
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  featureList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  featureChip: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  featureText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  relatedSection: {
    marginTop: spacing.xl,
  },
  relatedCardWrap: {
    width: 170,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
});