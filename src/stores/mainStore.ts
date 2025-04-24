import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import {
  fetchPlayers as fetchPlayersFromApi,
  fetchOwnItems,
  fetchEquipedItems,
  equipItem,
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

  async function equipOwnedItem(characterId: number, itemId: string) {
    try {
      // 1) send equip request
      await equipItem(characterId, itemId)

      // 2) locate the item you just equipped
      const ownIdx = ownItems.value.findIndex(i => i.item_id === itemId)
      if (ownIdx === -1) {
        console.warn(`Tried to equip item ${itemId} but it wasn't in ownItems`)
        return
      }
      const newItem = ownItems.value[ownIdx]

      // 3) if there's already something in that same slot, unequip it
      const oldIdx = equipedItems.value.findIndex(i => i.slot === newItem.slot)
      if (oldIdx !== -1) {
        const [oldItem] = equipedItems.value.splice(oldIdx, 1)
        ownItems.value.push(oldItem)
      }

      // 4) move the new item into equipedItems
      ownItems.value.splice(ownIdx, 1)
      equipedItems.value.push(newItem)
    } catch (err) {
      console.error('Equip failed:', err)
      throw err
    }
  }

  return {
    players,
    ownItems,
    equipedItems,
    fetchPlayers,
    fetchOwnItemsByCharacter,
    fetchEquipedItemsByCharacter,
    equipOwnedItem,
  }
})
