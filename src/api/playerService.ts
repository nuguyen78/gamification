import api from './authService'

export async function fetchPlayer(characterId: number) {
  const response = await api.get('/player_info.php', {
    params: { character_id: characterId },
  })
  return response.data
}

export async function fetchPlayers(pageType: string | null = null) {
  const url = `https://l2pevents.cz/fetch_data.php${pageType ? `?page_type=${pageType}` : ''}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch players')
  }
  return await response.json()
}

export async function fetchOwnItems(characterId: number) {
  const response = await api.get('/own_items.php', {
    params: { character_id: characterId },
  })
  return response.data
}

export async function fetchEquipedItems(characterId: number) {
  const response = await api.get('/equiped_items.php', {
    params: { character_id: characterId },
  })
  return response.data
}

export async function equipItem(characterId: number, itemId: string) {
  const res = await api.post(`/equip_item.php`, {
    character_id: characterId,
    item_id: itemId,
  })
  return res.data
}
