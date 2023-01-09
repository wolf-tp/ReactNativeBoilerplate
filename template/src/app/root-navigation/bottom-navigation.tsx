import React from 'react';
import { View } from 'react-native';

import { ImageSvg, ImageSvgProps } from '@assets';
import { HomeScreen } from '@features/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({
  color,
  focused,
  ...svgProps
}: {
  focused: boolean;
  color: string;
  size: number;
} & ImageSvgProps) => {
  const IconComponent = (
    <ImageSvg
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
      {...svgProps}
    />
  );
  if (!focused) return IconComponent;
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ImageSvg name="ActiveBottomTab" width={45} height={45} fill={color} />
      {IconComponent}
    </View>
  );
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#89969F',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: props => (
            <TabBarIcon {...props} name="HomeBottom" fill={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={HomeScreen}
        options={{
          tabBarIcon: props => (
            <TabBarIcon
              {...props}
              name="CalendarBottomTab"
              stroke={props.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarIcon: props => (
            <TabBarIcon {...props} name="ProfileBottomTab" fill={props.color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
