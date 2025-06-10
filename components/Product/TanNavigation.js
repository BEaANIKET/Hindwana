import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './Style';

export const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { key: 'details', label: 'Product Details' },
    { key: 'reviews', label: 'Reviews' },
    { key: 'about', label: 'About Product' }
  ];

  return (
    <View style={styles.tabButtons}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => onTabChange(tab.key)}
          style={[
            styles.tabButton,
            activeTab === tab.key && styles.activeTabButton
          ]}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === tab.key && styles.activeTabButtonText
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
