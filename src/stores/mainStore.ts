import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import {
  fetchPlayers as fetchPlayersFromApi,
  fetchOwnItems,
  fetchEquipedItems,
} from '@/api/playerService'

interface Player {
  id: string
  name: string
  nickname: string
  surname: string
  phone: string
  hra1: string
  hra2: string
  hra3: string
  hra4: string
  hra5: string
  hra6: string
  total_score: string
}

interface Item {
  item_id: string
  name: string
  description: string
  slot: string
  bonus: string
}

export const usePlayerStore = defineStore('player', () => {
  const players = ref<Player[]>([])

  const ownItems = ref<Item[]>([])

  const equipedItems = ref<Item[]>([])

  async function fetchPlayers(pageType: string | null = null) {
    try {
      players.value = await fetchPlayersFromApi(pageType)
    } catch (err) {
      console.error(err)
    }
    return players.value
  }

  // Fetch items based on character ID
  async function fetchOwnItemsByCharacter(characterId: number) {
    try {
      ownItems.value = await fetchOwnItems(characterId)
    } catch (err) {
      console.error(err)
    }
    return ownItems.value
  }

  // Fetch items based on character ID
  async function fetchEquipedItemsByCharacter(characterId: number) {
    try {
      equipedItems.value = await fetchEquipedItems(characterId)
    } catch (err) {
      console.error(err)
    }
    return equipedItems.value
  }

  /*   watchEffect(() => {
    fetchPlayers()
  }) */

  return {
    players,
    ownItems,
    equipedItems,
    fetchPlayers,
    fetchOwnItemsByCharacter,
    fetchEquipedItemsByCharacter,
  }
})
