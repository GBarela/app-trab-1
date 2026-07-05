import { Alert, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CartItemRow from '../components/CartItemRow';
import SectionHeader from '../components/SectionHeader';
import { useCart } from '../context/CartContext';
import { AppStackParamList } from '../navigation/types';
import { colors, radius, shadow, spacing } from '../theme';

export default function CartScreen() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = items.length > 0 ? 19.9 : 0;
  const discount = subtotal >= 500 ? 40 : 0;
  const total = subtotal + shipping - discount;

  if (!items.length) {
    return (
      <SafeAreaView style={styles.emptyScreen}>
        <View style={styles.emptyHeader}>
          <View style={styles.emptyHeaderLeft}>
            <Ionicons name="basket-outline" size={20} color={colors.surface} />
            <Text style={styles.emptyHeaderTitle}>minha cesta</Text>
          </View>
          <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
            <Ionicons name="close" size={26} color={colors.surface} />
          </Pressable>
        </View>

        <View style={styles.emptyContent}>
          <View style={styles.emptyIconWrap}>
            <Ionicons name="basket-outline" size={74} color="#A7A7A7" />
          </View>
          <Text style={styles.emptyTitle}>sua cesta tá vazia</Text>
          <Text style={styles.emptyText}>
            que tal navegar pelas milhares de ofertas e achar uma especial para você?
          </Text>

          <Pressable style={styles.emptyPrimaryButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.emptyPrimaryButtonText}>ver produtos</Text>
          </Pressable>

          <View style={styles.emptyFloatingIcons}>
            <View style={styles.emptyFloatingIcon}>
              <Ionicons name="cash-outline" size={20} color={colors.surface} />
            </View>
            <View style={styles.emptyFloatingIcon}>
              <Ionicons name="gift-outline" size={20} color={colors.surface} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const handleCheckout = () => {
    Alert.alert('Checkout simulado', 'Pedido montado com sucesso.');
    clearCart();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
            onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
            onRemove={() => removeFromCart(item.product.id)}
          />
        )}
        ListFooterComponent={
          <View>
            <View style={styles.summaryCard}>
              <SectionHeader title="Resumo" />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  {subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Frete</Text>
                <Text style={styles.summaryValue}>
                  {shipping.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Desconto</Text>
                <Text style={styles.summaryDiscount}>
                  -{discount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable style={styles.secondaryButton} onPress={clearCart}>
                <Text style={styles.secondaryButtonText}>Limpar carrinho</Text>
              </Pressable>
              <Pressable style={styles.primaryButton} onPress={handleCheckout}>
                <Text style={styles.primaryButtonText}>Finalizar checkout</Text>
              </Pressable>
            </View>
          </View>
        }
        ListFooterComponentStyle={styles.footerSpacing}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyScreen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  emptyHeader: {
    height: 56,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  emptyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyHeaderTitle: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '900',
  },
  emptyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
  },
  emptyIconWrap: {
    marginBottom: spacing.md,
  },
  emptyTitle: {
    color: '#6E6E6E',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    color: '#8A8A8A',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    maxWidth: 280,
  },
  emptyPrimaryButton: {
    marginTop: spacing.xl,
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  emptyPrimaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '900',
  },
  emptyFloatingIcons: {
    position: 'absolute',
    left: spacing.md,
    top: '62%',
    gap: spacing.sm,
  },
  emptyFloatingIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    flex: 1,
    minWidth: 0,
    color: colors.textMuted,
    fontSize: 14,
  },
  summaryValue: {
    flexShrink: 0,
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'right',
  },
  summaryDiscount: {
    flexShrink: 0,
    color: colors.success,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  totalValue: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '900',
  },
  footerSpacing: {
    paddingBottom: spacing.xl,
  },
});