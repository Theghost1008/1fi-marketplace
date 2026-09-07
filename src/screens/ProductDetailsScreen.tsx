import { useEffect, useMemo, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Alert } from "react-native";
import { useProduct } from '@/hooks/useProduct';
import { LoadingView } from '@/components/LoadingView';
import { ErrorView } from '@/components/ErrorView';
import { VariantSelector } from '@/components/VariantSelector';
import { EMIPlanCard } from '@/components/EMIPlanCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, spacing, typography } from '@/theme/token';
import { formatINR } from '@/utils/currency';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({route}:Props){
    const {productId} = route.params;
    const { data: product, isLoading, isError, error, refetch } = useProduct(productId);
    const [ selectedVariantId, setSelectedVariantId ] = useState<string>('');
    const [ selectedPlanId, setSelectedPlanId]= useState<string>('');
    useEffect(()=>{
        if(product){
            setSelectedVariantId(product.variants.find((v)=>v.inStock)?.id ?? product.variants[0]?.id ?? '');
            setSelectedPlanId(product.emiPlans.find((p)=>p.isRecommended)?.id ?? product.emiPlans[0]?.id ?? '');
        }
    },[product]);
    const selectedVariant = useMemo(
        ()=> product?.variants.find((v)=>v.id===selectedVariantId),
        [product,selectedVariantId]
    );
    const selectedPlan = useMemo(
        ()=>product?.emiPlans.find((p)=>p.id===selectedPlanId),
        [product,selectedPlanId]
    );
    const finalPrice = (product?.basePrice ?? 0) + (selectedVariant?.priceDelta ?? 0);
    if(isLoading)
        return <LoadingView message="Loading product..."/>;
    if(isError || !product)
        return <ErrorView message={(error as Error)?.message ?? 'Product not found!!'}/>;

    const canProceed = !!selectedVariant?.inStock && !!selectedPlan;
    const handleProceed = ()=>{
        if(!canProceed || !selectedPlan)
            return;
        Alert.alert(
            'Proceeding',
            `${product.name} (${selectedVariant?.label}) . ${selectedPlan.tenureMonths}-month plan at ${formatINR(selectedPlan.monthlyAmount)}/mo`
        );
    };
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={{uri: product.imageUrl}} style={styles.image} resizeMode="cover"/>
                <View style={styles.body}>
                    <Text style={styles.brand}>{product.brand}</Text>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>{formatINR(finalPrice)}</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    <VariantSelector
                        variants={product.variants}
                        selectedId={selectedVariantId}
                        onSelect={setSelectedVariantId}
                    />

                    <Text style={styles.sectionLabel}>Choose an EMI plan</Text>
                    {product.emiPlans.map((plan) => (
                        <EMIPlanCard
                        key={plan.id}
                        plan={plan}
                        selected={plan.id === selectedPlanId}
                        onSelect={setSelectedPlanId}
                        />
                    ))}
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View>
                    <Text style={styles.footerLabel}>Monthly EMI</Text>
                    <Text style={styles.footerAmount}>
                        {selectedPlan ? `${formatINR(selectedPlan.monthlyAmount)}/mo` : '—'}
                    </Text>
                </View>
                <PrimaryButton
                    label={selectedVariant?.inStock === false ? 'Out of stock' : 'Proceed with this plan'}
                    onPress={handleProceed}
                    disabled={!canProceed}
                    style={styles.footerButton}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  image: {
    width: '100%',
    aspectRatio: 1.3,
    backgroundColor: colors.chipBackground,
  },
  body: {
    padding: spacing.lg,
  },
  brand: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: 2,
  },
  name: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  price: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  footerLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  footerAmount: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  footerButton: {
    minWidth: 190,
  },
});
