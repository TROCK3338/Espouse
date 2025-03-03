import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

// Sample blog data (Replace this with real data)
const blogs = [
  { id: 1, title: "First Blog", image: require("../assets/blog1.jpg"), content: "This is the first blog content..." },
  { id: 2, title: "Second Blog", image: require("../assets/blog2.jpg"), content: "This is the second blog content..." },
];

type Props = NativeStackScreenProps<RootStackParamList, 'BlogDetail'>;

// const BlogDetailScreen = ({ route }: Props) => {
//   const { blogId } = route.params; // Get the blogId
//   const blog = blogs.find((b) => b.id === blogId); // Find blog by id

//   if (!blog) {
//     return <View style={styles.container}><Text style={styles.title}>Blog Not Found</Text></View>;
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={blog.image} style={styles.image} />
//       <Text style={styles.title}>{blog.title}</Text>
//       <Text style={styles.content}>{blog.content}</Text>
//     </View>
//   );
// };

const BlogDetailScreen = ({ route }: Props) => {
  const { blog } = route.params;

  return (
    <View style={styles.container}>
      <Image source={blog.image} style={styles.image} />
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.content}>{blog.subtitle ?? "No subtitle Available"}</Text> {/* Display subtitle or content */}
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
    marginTop: 40,
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#fff",
    marginTop: 20,
  },
  content: {
    fontSize: 16,
    color: "#ddd",
    marginTop: 10,
  },
});

export default BlogDetailScreen;