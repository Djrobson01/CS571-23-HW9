import { useState, useContext, useEffect } from 'react';
import BadgerPreferencesContext from '../../contexts/BadgerPreferencesContext';
import BadgerPreferenceSwitch from '../BadgerPreferenceSwitch';
import { View } from 'react-native';

function BadgerPreferencesScreen(props) {
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext);
    console.log(prefs['campus'])

    const handleToggle = (name, val) => {
        let temp = JSON.parse(JSON.stringify(prefs));
        temp[name] = val
        setPrefs(temp);
    }
    
    return <View>
        {
            prefs === undefined
            ? 
            <> 
                {console.log('prefs empty')}
            </>  
            :
            <>        
            {
                Object.keys(prefs).map((pref) => {
                    return <BadgerPreferenceSwitch
                        key={pref} 
                        prefName={pref} 
                        handleToggle={handleToggle}
                    />
                })
            }
            </>
        }
        </View>
        
}

export default BadgerPreferencesScreen;