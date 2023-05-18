import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import { Ionicons } from '@expo/vector-icons';

function BadgerTabs(props) {
    const Tab = createBottomTabNavigator();
    return <Tab.Navigator>
        <Tab.Screen 
            name="Articles" 
            options={{
                tabBarActiveTintColor: 'red',
                tabBarIcon: (tabInfo) => {
                    return <Ionicons 
                        name="md-newspaper-outline" 
                        size={24} 
                        color={tabInfo.focused ? 'red' : 'black'} 
                    />
                }
            }} 
            component={BadgerNewsScreen} />
        <Tab.Screen 
            name="Preferences" 
            options={{
                tabBarActiveTintColor: 'red',
                tabBarIcon: (tabInfo) => {
                    return <Ionicons 
                        name="md-settings-outline" 
                        size={24} 
                        color={tabInfo.focused ? 'red' : 'black'} />
                }}
            } 
            component={BadgerPreferencesScreen} />
    </Tab.Navigator>
}

export default BadgerTabs;