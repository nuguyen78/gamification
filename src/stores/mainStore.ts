import { ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import {
  fetchPlayers as fetchPlayersFromApi,
  fetchOwnItems,
  fetchEquipedItems,
  equipItem,
  fetchPlayer as fetchPlayerFromApi,
} from '@/api/playerService'

interface Player {
  id: string
  nick: string
  avatar: string
  lvl: number
  experience: number
  health: number | 0
  strength: number | 0
  agility: number | 0
  stamina: number | 0
  intelligence: number | 0
  speed: number | 0
  armor: number | 0
}

interface Item {
  item_id: string
  name: string
  description: string
  slot: string
  stats: number
  stats_type: string
  discount: number
  discount_type: string | ''
}

export const usePlayerStore = defineStore('player', () => {
  const player = ref<Player | null>(null)
  const players = ref<Player[]>([])
  const ownItems = ref<Item[]>([])
  const equipedItems = ref<Item[]>([])

  // Fetch a single player by character ID
  async function fetchPlayer(characterId: number): Promise<Player | null> {
    try {
      player.value = await fetchPlayerFromApi(characterId)
    } catch (err) {
      console.error('Failed to fetch player:', err)
    }
    return player.value
  }

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
    player,
    players,
    ownItems,
    equipedItems,
    fetchPlayer,
    fetchPlayers,
    fetchOwnItemsByCharacter,
    fetchEquipedItemsByCharacter,
    equipOwnedItem,
  }
})
