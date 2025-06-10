import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

// Styles (consolidated from all components)
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  actionSection: {
    padding: 16,
  },
  tabsContainer: {
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    paddingTop: 16,
  },
  // Image Gallery Styles
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: width,
    height: width * 0.8,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  offerBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  offerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedThumbnail: {
    borderColor: '#3B82F6',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  // Product Info Styles
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  productSku: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: '#6B7280',
    textDecorationLine: 'line-through',
    marginRight: 12,
  },
  savingsBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  savingsText: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '500',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },
  feature: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stockText: {
    color: '#10B981',
    fontWeight: '500',
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    color: '#6B7280',
    marginLeft: 8,
  },
  // Quantity Selector Styles
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontWeight: '500',
    marginRight: 16,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  quantityButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityValue: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
  // Action Buttons Styles
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buyNowText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  addToCartButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  secondaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryActionText: {
    color: '#6B7280',
    marginLeft: 8,
  },
  // Tab Navigation Styles
  tabButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#3B82F6',
  },
  tabButtonText: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabButtonText: {
    color: '#3B82F6',
  },
  // Tab Content Styles
  tabContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontWeight: '500',
    flex: 1,
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
  },
  // Review Styles
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  reviewUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUserName: {
    fontWeight: '600',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  verifiedText: {
    color: '#065F46',
    fontSize: 10,
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  reviewComment: {
    color: '#374151',
    marginTop: 8,
  },
  // About Tab Styles
  aboutText: {
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
});
