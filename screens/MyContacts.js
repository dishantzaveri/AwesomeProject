import React, { useState, useEffect } from 'react'
import { View, Text,FlatList, StyleSheet, TouchableOpacity,PermissionsAndroid} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';
import { useIsFocused } from '@react-navigation/native';
import SamplecontactCard from './SamplecontactCard';


export default function MyContacts({ navigation }) {

   const isFocused = useIsFocused();

   const [myContacts, setMyContacts] = useState([]);

   myContacts.sort((a, b) =>
  a.givenName.toLowerCase() > b.givenName.toLowerCase()
 );
 
   useEffect(() => {
      getAllContacts();
   }, [isFocused])

   async function getAllContacts() {
      try {
         const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS
         );
         if(permission === 'granted') {
            const contacts = await Contacts.getAll();
            console.log(contacts);
            setMyContacts(contacts);
         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <View style={styles.container}>
         <Ionicons 
            name='add-circle'
            size={62}
            color='green'
            style={styles.addIcon}
            onPress={() => navigation.navigate('CreatingContact')}
         />
         
         <FlatList 
            data={myContacts}
            keyExtractor={(item) => item.recordID}
            renderItem={({ item }) => (
               <TouchableOpacity onPress={() => navigation.navigate('Profile', {
                  contactInfo: { id: item.recordID }
               })}>
                  <SamplecontactCard contactInfo={item} />
               </TouchableOpacity>
            )}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1, 
      backgroundColor: 'white'
    },
    addIcon: {
      bottom: 20,
      right: 20,
      position: 'absolute',
      zIndex: 1,

    },
})