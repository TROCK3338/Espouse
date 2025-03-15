import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; // Ensure correct import path

// ✅ Define navigation type
type NavigationProp = StackNavigationProp<RootStackParamList, 'BlogDetail'>;

const blogs = [
  { id: '1', title: 'IVF Success Tips', subtitle: 'Improve your chances of success', image: require('../assets/blog1.png') },
  { id: '2', title: 'Latest in Fertility', subtitle: 'New advancements in IVF', image: require('../assets/blog2.png') },
];

const BlogsCarousel = () => {
  const navigation = useNavigation<NavigationProp>(); // ✅ Apply navigation type

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Our Blogs</Text> 
      <FlatList
        data={blogs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BlogDetail', { blog: item })} // ✅ Now correctly typed
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
    color: '#333',
  },
  card: {
    width: 220, 
    height: 270, // ✅ Adjusted height
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160, // ✅ Adjusted image height
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default BlogsCarousel;