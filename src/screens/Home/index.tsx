import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import styles from './styles'
import { Participant } from '../../components/Participant/intex'
import { useState } from 'react'

const translatedMonth = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]

const getActualDate = () => {
  const newDate = new Date()
  const day = newDate.getDate()
  const month = translatedMonth[newDate.getMonth()]
  const year = newDate.getFullYear()

  return `${day} de ${month} de ${year}`
}

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [newParticipant, setNewParticipant] = useState<string>('')
  const actualDate = getActualDate()

  function handleParticipantAdd() {
    if (participants.includes(newParticipant)) {
      return Alert.alert('Participante existente', 'Já existe esse participante')
    }
    setParticipants(prevState => [...prevState, newParticipant])
    setNewParticipant('')
  }
  function handleParticipantRemove(name: string) {
    const filteredArray = participants.filter(participant => participant != name)
    Alert.alert('Remover', `Deseja realmente remover ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(filteredArray),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ])
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Cadastro de evento</Text>
      <Text style={styles.eventDate}>{actualDate}</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={e => setNewParticipant(e)}
          value={newParticipant}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant key={item} name={item} onRemove={handleParticipantRemove} />
        )}
        ListEmptyComponent={
          <Text style={styles.listEmptyText}>Ninguém foi adicionado a lista</Text>
        }
      />
    </View>
  )
}
