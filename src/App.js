import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {
  const [ repositories, setRepositories ] = useState( [] );

  useEffect( () => {
    
    try {
      api.get('/repositories').then(response => {
        setRepositories(response.data);
      });

    } catch (error) {
      console.log(error);

    }

  }, [] );

  async function handleLikeRepository(id) {
    const response = await api.post(`/repositories/${id}/like`, {});
    const likedRepository = response.data;
    
    const itemIndex = repositories.findIndex(repository => repository.id === id);

    if (itemIndex > -1) {

      var newRepositories = [... repositories];
      newRepositories.splice(itemIndex, 1, likedRepository);

      setRepositories(newRepositories);

    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item }) => (

          <View style={styles.repositoryContainer}>
            <Text style={styles.repository}> {item.title} </Text>

            <View style={styles.techsContainer}>
              
              {item.techs.map(tech => (
                <Text key={`${item.id}-${tech}`} style={styles.tech}>
                  {tech}
                </Text>
              ))}
              
            </View>

            <View style={styles.likesContainer}>
              <Text
                style={styles.likeText}
                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                testID={`repository-likes-${item.id}`}
              >
                {item.likes} curtidas
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(item.id)}
              // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
              testID={`like-button-${item.id}`}
            >
              <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
          </View>

          )}
        />

        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 3,

  },
  repository: {
    fontFamily: 'Lucida Grande',
    fontSize: 32,
    fontWeight: "bold",
  },

  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontFamily: 'Lucida Grande',
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: "#fff",

    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 3,
  },

  likesContainer: {
    marginTop: 15,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  likeText: {
    fontFamily: 'Lucida Grande',
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Lucida Grande',
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,

    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 3,
  },
});
