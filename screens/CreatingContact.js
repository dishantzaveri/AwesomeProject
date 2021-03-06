import React, {useState} from 'react'
import { View, StyleSheet, Button, TextInput, Alert } from 'react-native';
import Contacts from 'react-native-contacts';

export default function CreateContact({ navigation }) {

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [address, setAddress] = useState('');
   const [emailId, setEmailId] = useState('');
   const [phoneNumbers, setPhoneNumbers] = useState(['']);


   function addContact() {
      if(!firstName && !lastName) {
         Alert.alert('Something went wrong', 'Please fill the all the required fields');
         return;
      }
      const myPhonenumbers = phoneNumbers.map((ph) => {
         return { label: 'mobile', number: ph };
      });

      const contactInfo = {
         displayName: firstName + ' ' + lastName,
         givenName: firstName + ' ' + lastName,
         contactaddress:address,
         phoneNumbers: myPhonenumbers,
         contactemailId: emailId,
      }
      Contacts.addContact(contactInfo)
         .then(() => navigation.navigate('MyContacts'))
         .catch((error) => console.log(error))
   }

   return (
      <View style={styles.container}>
         <View style={styles.inputContainer}>
            <TextInput 
               style={styles.input}
               placeholder='FirstName'
               value={firstName}
               onChangeText={(text) => setFirstName(text)}
            />
            <TextInput 
               style={styles.input}
               placeholder='LastName'
               value={lastName}
               onChangeText={(text) => setLastName(text)}
            />
            <TextInput 
               style={styles.input}
               placeholder='Address'
               value={address}
               onChangeText={(text) => setAddress(text)}
            />
            <TextInput 
               style={styles.input}
               placeholder='EmailId'
               value={emailId}
               onChangeText={(text) => setEmailId(text)}
            />
         </View>
         {phoneNumbers.map((phoneNumber, index) => (
            <View style={{ ...styles.inputContainer, marginVertical: 0}} key={index}>
               <TextInput 
               style={styles.input}
               placeholder='Phone Number'
               keyboardType='number-pad'
               value={phoneNumber}
            />
            </View>
         ))}
         <Button 
            title='Save'
            onPress={() => addContact()}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
    },
    inputContainer: {
      padding: 30,
      margin: 20
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: 'pink',
      padding: 15
    }
})