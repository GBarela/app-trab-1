import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import StoreLogo from '../components/StoreLogo';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import StoreCartIcon from '../img/storeCartIcon.46c2c513.svg';
import StoreFrontIcon from '../img/storeFrontIcon.759623b8.svg';
import { useCart } from '../context/CartContext';
import { carouselProducts, showcaseProducts } from '../data/products';
import { AppStackParamList } from '../navigation/types';
import { colors, radius, shadow, spacing } from '../theme';

type Props = NativeStackScreenProps<AppStackParamList, 'Home'>;

const featuredBanners = [
  {
    id: 'main',
    title: 'Aproveite antes que acabe',
    subtitle: 'Promoções em destaque com clima de campanha relâmpago.',
    image: require('../img/AproveiteAntesQueAcabe.png'),
  },
  {
    id: 'cinema',
    title: 'Festival de cinema',
    subtitle: 'Imagem e som para montar sua sala ideal.',
    image: require('../img/festivalDeCinema.webp'),
  },
  {
    id: 'winter',
    title: 'Inverno com até 30% de desconto',
    subtitle: 'Casa, moda e utilidades para os dias frios.',
    image: require('../img/invernoComAte30%DeDesconto.webp'),
  },
];

export default function HomeScreen({ navigation }: Props) {
  const { items } = useCart();
  const { width } = useWindowDimensions();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const carouselWidth = width - spacing.md * 1.5;
  const tileWidth = Math.min((width - spacing.md * 3) / 2, 170);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topStrip}>
          <Image source={require('../img/cartaoclientestrip1.webp')} style={styles.topStripImage} />
        </View>

        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Ionicons name="menu" size={24} color={colors.surface} />
            <StoreLogo width={108} height={30} />
            <View style={styles.headerIcons}>
              <Ionicons name="person-circle-outline" size={24} color={colors.surface} />
              <StoreFrontIcon width={24} height={24} />
              <Ionicons name="heart-outline" size={24} color={colors.surface} />
              <Pressable onPress={() => navigation.navigate('Cart')} hitSlop={10} style={styles.cartButton}>
                <StoreCartIcon width={28} height={28} />
                {cartItemsCount > 0 ? <View style={styles.cartDot} /> : null}
              </Pressable>
            </View>
          </View>

          <View style={styles.searchBar}>
            <TextInput
              placeholder="busque aqui seu produto"
              placeholderTextColor="#8B8B8B"
              style={styles.searchInput}
              editable={false}
            />
            <Ionicons name="search" size={22} color={colors.primary} />
          </View>

          <View style={styles.cepBar}>
            <Ionicons name="location-outline" size={17} color={colors.surface} />
            <Text style={styles.cepText}>informe seu CEP</Text>
          </View>
        </View>

        <View style={styles.promoHeroWrap}>
          <Image source={require('../img/copa_banner.webp')} style={styles.copaBanner} />
        </View>

        <View style={styles.carouselSection}>
          <FlatList
            data={[
              require('../img/carrousel1.webp'),
              require('../img/carrousel2.webp'),
              require('../img/carrousel3.webp'),
              require('../img/carrousel4.webp'),
              require('../img/carrousel5.webp'),
              require('../img/carrousel6.webp'),
              require('../img/carrousel7.webp'),
              require('../img/carrousel8.webp'),
            ]}
            keyExtractor={(_, index) => `carousel-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.shortcutsList}
            snapToInterval={carouselWidth}
            decelerationRate="fast"
            pagingEnabled={false}
            renderItem={({ item }) => (
              <View style={[styles.carouselCard, { width: carouselWidth }]}>
                <Image source={item} style={styles.carouselImage} />
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
          />
        </View>

        <View style={styles.bannerGridRow}>
          {[
            require('../img/invernoComAte30%DeDesconto.webp'),
            require('../img/torcidaaaça.webp'),
            require('../img/festivalDeCinema.webp'),
          ].map((banner, index) => (
            <Image key={`banner-${index}`} source={banner} style={styles.bannerCard} />
          ))}
        </View>

        <View style={styles.offerStripSection}>
          <FlatList
            data={[
              require('../img/baixeOApp!.webp'),
              require('../img/offertasDaTv.webp'),
              require('../img/retireNaLoja.webp'),
              require('../img/leve+pague-.webp'),
              require('../img/cartaoCliente.webp'),
              require('../img/giftCard.webp'),
              require('../img/freteGratis.webp'),
              require('../img/obaCupom.webp'),
            ]}
            keyExtractor={(_, index) => `offer-icon-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offerStripContent}
            renderItem={({ item }) => <Image source={item} style={styles.offerIcon} />}
          />
        </View>

        <View style={styles.finalSection}>
          <Text style={styles.finalTitle}>as melhores ofertas</Text>
          <Image source={require('../img/AproveiteAntesQueAcabe.png')} style={styles.finalBanner} />
        </View>

        <View style={styles.offerCardsSection}>
          <View style={styles.offerCardsGrid}>
            <Image source={require('../img/oferta1.webp')} style={[styles.offerCard, styles.offerCardTopLeft]} />
            <Image source={require('../img/oferta2.webp')} style={[styles.offerCard, styles.offerCardTopRight]} />
            <Image source={require('../img/oferta3.webp')} style={[styles.offerCard, styles.offerCardBottomLeft]} />
            <Image source={require('../img/oferta4.webp')} style={[styles.offerCard, styles.offerCardBottomRight]} />
          </View>
          <Image source={require('../img/ofertaAoVivo.webp')} style={styles.offerLiveBanner} />
        </View>

        <View style={styles.productSessionSection}>
          <SectionHeader title="Retire na loja em 2h" />
          <FlatList
            data={showcaseProducts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productGridRow}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
              />
            )}
          />

          <View style={styles.carouselProductsSection}>
            <Text style={styles.finalTitle}>Os mais queridos estão aqui</Text>
            <FlatList
              data={carouselProducts}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselProductsList}
              ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
              renderItem={({ item }) => (
                <View style={styles.carouselProductItem}>
                  <ProductCard
                    product={item}
                    compact
                    onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
                  />
                </View>
              )}
            />
          </View>
        </View>

        <View style={styles.footerSection}>
          <Image source={require('../img/cesta.webp')} style={styles.footerBasket} />

          <View style={styles.footerLinksCard}>
            <Text style={styles.footerLinksTitle}>ofertas que você também precisa ver</Text>
            <View style={styles.footerLinksGrid}>
              <View style={styles.footerLinksColumn}>
                <Text style={styles.footerLink}>air fryer</Text>
                <Text style={styles.footerLink}>escova secadora</Text>
                <Text style={styles.footerLink}>figurinha da copa</Text>
                <Text style={styles.footerLink}>body splash giovanna baby</Text>
                <Text style={styles.footerLink}>moto g17</Text>
                <Text style={styles.footerLink}>tv 32 polegadas</Text>
                <Text style={styles.footerLink}>tv 65 polegadas</Text>
                <Text style={styles.footerLink}>chocolate lindt</Text>
              </View>
              <View style={styles.footerLinksColumn}>
                <Text style={styles.footerLink}>liquidificador</Text>
                <Text style={styles.footerLink}>álbum da copa</Text>
                <Text style={styles.footerLink}>presente dia dos namorados</Text>
                <Text style={styles.footerLink}>kit elseve</Text>
                <Text style={styles.footerLink}>moto g67</Text>
                <Text style={styles.footerLink}>a17</Text>
                <Text style={styles.footerLink}>tv 55 polegadas</Text>
                <Text style={styles.footerLink}>óleo paixao</Text>
              </View>
            </View>
          </View>

          <View style={styles.footerInfoCard}>
            <Text style={styles.footerInfoItem}>sac 4003 4848</Text>
            <Text style={styles.footerInfoItem}>guia de segurança</Text>
            <Text style={styles.footerInfoItem}>tudo em casa</Text>
            <Text style={styles.footerInfoItem}>entregas e devoluções</Text>
          </View>

          <Pressable style={styles.footerAccordion}>
            <Text style={styles.footerAccordionTitle}>mais informações</Text>
            <Ionicons name="chevron-down" size={18} color="#7A7A7A" />
          </Pressable>

          <View style={styles.footerSocials}>
            <Ionicons name="logo-instagram" size={22} color="#6B6B6B" />
            <Ionicons name="logo-youtube" size={22} color="#6B6B6B" />
            <Ionicons name="logo-facebook" size={22} color="#6B6B6B" />
            <Ionicons name="logo-tiktok" size={22} color="#6B6B6B" />
          </View>

          <View style={styles.footerBrand}>
            <StoreLogo width={124} height={36} />
          </View>

          <Text style={styles.footerLegal}>
            americanas s.a. / CNPJ: 00.766.574/0006-60 / Inscrição Estadual: 85.687.08-5 /
            Endereço Rua Sacadura Cabral, 102 - Rio de Janeiro, RJ - 20081-902
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  container: {
    paddingBottom: spacing.xxl,
    backgroundColor: '#EFEFEF',
  },
  topStrip: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topStripImage: {
    width: '100%',
    height: 38,
    resizeMode: 'contain',
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  cartButton: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  searchBar: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    shadowColor: shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    paddingVertical: 0,
  },
  cepBar: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  cepText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '800',
  },
  promoHeroWrap: {
    marginTop: -50,
    backgroundColor: 'transparent',
  },
  copaBanner: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  carouselSection: {
    marginTop: spacing.lg,
  },
  shortcutsList: {
    paddingHorizontal: spacing.md,
  },
  carouselCard: {
    overflow: 'visible',
  },
  carouselImage: {
    width: '100%',
    height: 165,
    borderRadius: 0,
  },
  bannerGridRow: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    flexDirection: 'row',
    gap: 0,
  },
  bannerCard: {
    flex: 1,
    height: 100,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  offerStripSection: {
    marginTop: spacing.md,
  },
  offerStripContent: {
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  offerIcon: {
    width: 78,
    height: 78,
    marginRight: spacing.sm,
    resizeMode: 'contain',
  },
  finalSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs,
  },
  finalTitle: {
    color: colors.textMuted,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  finalBanner: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
    backgroundColor: '#EFEFEF',
  },
  section: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  offerCardsSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs,
  },
  offerCardsGrid: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  offerCard: {
    position: 'absolute',
    width: '49%',
    height: '55%',
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  offerCardTopLeft: {
    top: 0,
    left: 0,
  },
  offerCardTopRight: {
    top: 0,
    right: 0,
  },
  offerCardBottomLeft: {
    bottom: 0,
    left: 0,
  },
  offerCardBottomRight: {
    bottom: 0,
    right: 0,
  },
  offerLiveBanner: {
    width: '100%',
    height: 110,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    marginTop: spacing.xs,
  },
  productSessionSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  carouselProductsSection: {
    marginTop: spacing.lg,
  },
  carouselProductsList: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  carouselProductItem: {
    width: 220,
  },
  footerSection: {
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  footerBasket: {
    width: '100%',
    height: 128,
    resizeMode: 'contain',
    backgroundColor: '#F2F2F2',
  },
  footerLinksCard: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  footerLinksTitle: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  footerLinksGrid: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  footerLinksColumn: {
    flex: 1,
    gap: spacing.md,
  },
  footerLink: {
    color: '#2A2A2A',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  footerInfoCard: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    gap: spacing.xl,
  },
  footerInfoItem: {
    color: colors.textMuted,
    fontSize: 12,
  },
  footerAccordion: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerAccordionTitle: {
    color: colors.textMuted,
    fontSize: 13,
    flex: 1,
    marginRight: spacing.sm,
  },
  footerSocials: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  footerBrand: {
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  footerLegal: {
    color: colors.textMuted,
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 12,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  productGridRow: {
    justifyContent: 'space-between',
  },
});