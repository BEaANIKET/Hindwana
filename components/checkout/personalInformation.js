import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const PersonalInformation = ({ personalInfo, setPersonalInfo, showErrors = false }) => {
  const [errors, setErrors] = useState({ name: '', whatsapp: '' });

  useEffect(() => {
    if (showErrors) {
      validateFields();
    }
  }, [personalInfo, showErrors]);

  const validateFields = () => {
    let tempErrors = {};
    tempErrors.name = personalInfo.name?.trim() ? '' : 'Name is required';
    tempErrors.whatsapp = personalInfo.whatsapp?.trim() ? '' : 'WhatsApp number is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : null]}
          placeholder="Enter your name"
          value={personalInfo.name}
          onChangeText={(text) => setPersonalInfo({ ...personalInfo, name: text })}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>WhatsApp</Text>
        <TextInput
          style={[styles.input, errors.whatsapp ? styles.inputError : null]}
          placeholder="Enter WhatsApp number"
          value={personalInfo.whatsapp}
          onChangeText={(text) => setPersonalInfo({ ...personalInfo, whatsapp: text })}
          keyboardType="phone-pad"
        />
        {errors.whatsapp ? <Text style={styles.errorText}>{errors.whatsapp}</Text> : null}
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
  inputError: {
    borderColor: '#FF5A5F',
  },
  errorText: {
    color: '#FF5A5F',
    fontSize: 12,
    marginTop: 4,
  },
});

export default PersonalInformation;
