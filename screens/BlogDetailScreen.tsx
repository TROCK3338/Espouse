import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'BlogDetail'>;

const BlogDetailScreen = ({ route }: Props) => {
  const { blog } = route.params;

  return (
    <View style={styles.container}>
      <Image source={blog.image} style={styles.image} />
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.content}>This is the blog content...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  content: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default BlogDetailScreen;