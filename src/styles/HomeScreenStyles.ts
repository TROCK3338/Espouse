import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  calendarStrip: {
    height: 100,
    marginVertical: 20,
  },
  calendarHeader: {
    color: 'black',
  },
  dateNumber: {
    color: 'black',
  },
  dateName: {
    color: 'black',
  },
  highlightDateNumber: {
    color: 'white',
  },
  highlightDateContainer: {
    backgroundColor: '#00bcd4',
    borderRadius: 10,
  },
  dailyChallenge: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  challengeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  blogHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  blogImage: {
    width: 150,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  blogTitle: {
    width: 150,
    textAlign: 'center',
  },
});

export default styles;