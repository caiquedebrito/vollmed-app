import { Image, Pressable, ScrollView, SectionList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Debug } from '@/src/constants/utils'
import { Colors } from '@/src/constants/Colors'
import InputError from './InputError'
import { FieldError } from 'react-hook-form'

interface DropdownProps {
  placeholder: string,
  data: string[]
  onChange: (item: string) => void
  value?: string
  orientation?: 'top' | 'bottom'
  error?: FieldError
}

export default function Dropdown({ placeholder, data, onChange, value = '', orientation = 'bottom', error }: DropdownProps) {
  const [showList, setShowList] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(value)

  console.log('selectedItem', selectedItem)

  useEffect(() => {
    onChange(selectedItem)
  }, [selectedItem])

  const handleOnClick = () => {
    setShowList(!showList)
  }

  const pickItem = (item: string) => {
    setSelectedItem(item)
    setShowList(false)
  }

  const showMiniPlaceholder = selectedItem !== ''
  const isThereError = !!error

  return (
    <View style={{ flex: 1}}>
      <Pressable 
        style={[styles.container, isThereError && styles.error]}
        onPress={handleOnClick}
      >
        {
          showMiniPlaceholder && <Text style={styles.placeholder}>{placeholder}</Text>
        }
        <Text style={[styles.dropdown, showMiniPlaceholder && { paddingBottom: 4 }, isThereError && { color: Colors.red }]}>{selectedItem ? selectedItem : placeholder}</Text>
        <View>
          <Image source={require("@/src/assets/images/Dropdown.png")} />
        </View>
      </Pressable>
      {error && <InputError message={error.message} />}

      {
        showList && (
          <View style={[styles.list, styles[orientation]]}>
            <ScrollView nestedScrollEnabled>
              {
                data.map((item, index) => {
                  return (
                    <Text key={index} onPress={() => pickItem(item)} style={styles.item}>{item}</Text>
                  )
                })
              }
            </ScrollView>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    color: Colors.grey,
  },
  dropdown: {
    padding: 16,
    height: 56,
    color: 'black',
    fontSize: 16,
  },
  list: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    zIndex: 99,
    height: 200,
  },
  item: {
    padding: 16,
    fontSize: 16,
  },
  bottom: {
    top: 56,
  },
  top: {
    bottom: 56,
  },
  placeholder: {
    position: 'absolute',
    top: 4,
    left: 16,
    color: Colors.grey,
  },
  error: {
    borderColor: Colors.red,
  }
})