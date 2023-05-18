import { useEffect, useState, useContext, useRef } from 'react';
import { 
  View, Animated, ScrollView, Image, Text, 
  Dimensions, Modal, Pressable, StyleSheet, Alert 
} from 'react-native';
import BadgerCard from '../BadgerCard';
import BadgerPreferencesContext from '../../contexts/BadgerPreferencesContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function BadgerNewsScreen(props) {
    const [articles, setArticles] = useState([]);
    const [story, setStory] = useState('');
    const [modalArt, setModalArt] = useState({});
    const [modalVisible, setModalVisibility] = useState(false);
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext);
    const [fetched, setFetch] = useState(false);

    const fade = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
      Animated.timing(fade, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    };

    useEffect(() => {
      if(story !== '') {
        fadeIn();
      }
    }, [story])

    const filterArticles = (data) => {
      if(fetched) {
        let arts = []
        data.forEach(datum => {
          let found = false
          datum.tags.forEach(tag => {
            if(prefs[tag])
              found = true
          })

          if(found)
            arts.push(datum);
        })
        if(arts.length === 0) {
          Alert.alert('No articles will be found with current preferences', 'To find articles, be less restrictive in your preferences')
        }
        setArticles(arts)
      }
    }

    useEffect(() => {
      fetch('https://www.cs571.org/s23/hw9/api/news/articles', {
        method: 'GET',
        headers: {
          'X-CS571-ID': 'bid_14a36d6cb07d9384668f'
        }
      })
      .then(res => {
        setFetch(true)
        return res.json()
      })
      .then(data => filterArticles(data))
    }, [prefs])

    function handlePress (article) {
      setModalArt(article);
      setModalVisibility(!modalVisible);
      fetch(`https://www.cs571.org/s23/hw9/api/news/articles/${article.id}`, {
        method: 'GET',
        headers: {
          'X-CS571-ID': 'bid_14a36d6cb07d9384668f'
        }
      })
      .then(res => res.json())
      .then(data => {
        setStory(data['body'].join(' '));
      })
    }

    const handleLongPress = () => {
      console.log('Long pressed');
    }

    const handleClose = () => {
      setModalVisibility(!modalVisible);
      setStory('');
      fade.resetAnimation();
    }
    
    if(articles) {
        return <View style={{flex: 1}}>
            <Modal 
              animationType='slide'
              transparent={true}
              visible={modalVisible}
              onRequestClose={handleClose}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <ScrollView style={{margin: 5}}>
                    <Image 
                      style={{borderRadius: 15, width: (windowWidth - 30), height: (windowHeight/4)}}
                      source={{uri: modalArt.img}}
                    />
                    <Text style={{fontSize: 18, fontWeight: 500, margin: 5}}>{modalArt.title}</Text>
                    {
                      story === ''
                      ?<Text style={{margin: 5}}>The content is loading!</Text>
                      :<Animated.View style={{opacity: fade}}>
                        <Text style={{margin: 5}}>{story}</Text>
                        </Animated.View>
                    }
                  </ScrollView>
                  <Pressable
                    onPress={handleClose}
                    style={styles.button}
                  >
                    <Text style={styles.modalText}>Close</Text>
                  </Pressable>
                </View>
              </View>
              
            </Modal>
            <ScrollView>
              {
                articles.map((article) => {
                  return(
                    <BadgerCard key={article.id} onPress={() => handlePress(article)} onLongPress={handleLongPress}>
                      <Image 
                        style={{borderRadius: 15, width: (windowWidth - 35), height: (windowHeight/4)}}
                        source={{uri: article.img}}
                      />
                      <Text 
                        style={{fontSize: 18, fontWeight: 500}}
                      >
                        {article.title}
                      </Text>
                    </BadgerCard>
                  )
                })
              }
            
            </ScrollView>
        </View>
    }
    else {
        console.log('empty')
        return <></>
    }
}

export default BadgerNewsScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    width: windowWidth - 20,
    height: windowHeight - 30,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    width: 100,
    height: 40,
    margin: 25,
    elevation: 2,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  modalText: {
    color: 'white',
    textAlign: 'center',
  }
})