import { StyleSheet, Text, TextInput, View } from 'react-native';

const PersonalInformation = ({ personalInfo, setPersonalInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={personalInfo.name}
          onChangeText={(text) => setPersonalInfo({...personalInfo, name: text})}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>WhatsApp</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter WhatsApp number"
          value={personalInfo.whatsapp}
          onChangeText={(text) => setPersonalInfo({...personalInfo, whatsapp: text})}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
});

export default PersonalInformation;