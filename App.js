import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import BadgerPreferencesContext from './contexts/BadgerPreferencesContext';
import BadgerTabs from './components/navigation/BadgerTabs';

export default function App() {

  const [prefs, setPrefs] = useState({});

  useEffect(() => {
    fetch('https://www.cs571.org/s23/hw9/api/news/articles', {
      method: 'GET',
      headers: {
        'X-CS571-ID': 'bid_14a36d6cb07d9384668f'
      }
    })
    .then(res => res.json())
    .then(data => {
      let allTags = {}
      data.forEach((article) => {
        let tags = article.tags
        tags.forEach((tag) => {
          if(!(tag in allTags)) {
            allTags[tag] = true;
          }
        })
      })
      setPrefs(allTags)
    })
  }, [])

  return (
    <>
      <BadgerPreferencesContext.Provider value={[prefs, setPrefs]}>
        <NavigationContainer>
          <BadgerTabs />
        </NavigationContainer>
      </BadgerPreferencesContext.Provider>
      <StatusBar style="auto" />
    </>
  );
}