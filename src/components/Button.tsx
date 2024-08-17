import { Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import { Colors } from '@/src/constants/Colors'

interface ButtonProps {
  text: string
  disabled?: boolean
  onPress?: () => void
  variant?: 'primary' | 'secondary' | 'mini'
  loading?: boolean
}

export default function Button({ text, disabled, onPress, variant = 'primary', loading }: ButtonProps) {

  const variantStyle = variant === 'primary' ? {
    backgroundColor: disabled ? Colors.grey : Colors.blue3,
  } : variant === 'secondary' ?  {
    backgroundColor: Colors.white,
    borderColor: Colors.blue3,
    borderWidth: 2,
  } : {
    borderWidth: 1,
    borderColor: Colors.blue3,
    width: 152,
    height: 32,
  }

  const textVariant = variant !== 'primary' && { color: Colors.blue3 }

  return (
    // <Link asChild href='' style={[styles.button, variantStyle]}>
      <Pressable 
        onPress={onPress}
        style={[styles.button, variantStyle]}
        disabled={disabled || loading}
      >
        {
          loading ? (
            <ActivityIndicator size="small" color="#fff"/>
          ) : (
            <Text
              style={[styles.textButton, textVariant]}
            >
              {text}
            </Text>
          )
        }
      </Pressable>
    // </Link>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})