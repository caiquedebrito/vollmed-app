import { Colors } from '@/src/constants/Colors'
import { Link } from 'expo-router'
import React from 'react'
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text } from 'react-native'

interface OptionButtonProps {
  text: string
  icon: ImageSourcePropType
  href: string
}

export default function OptionButton({ text, icon, href }: OptionButtonProps) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.option}>
        <Image source={icon}/>
        <Text style={[styles.link]}>{text}</Text>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    backgroundColor: Colors.blue3,
    borderRadius: 10,
  },
  link: {
    color: 'white',
    padding: 10,
    fontSize: 18,
  },
})