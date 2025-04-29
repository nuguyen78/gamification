import api from './authService'

export async function fetchPlayer(characterId: number) {
  const url = `https://l2pevents.cz/gamification/player_info.php?character_id=${characterId}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch Own items')
  }
  return await response.json()
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
  const url = `https://l2pevents.cz/gamification/own_items.php?character_id=${characterId}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch Own items')
  }
  return await response.json()
}

export async function fetchEquipedItems(characterId: number) {
  const url = `https://l2pevents.cz/gamification/equiped_items.php?character_id=${characterId}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch Equiped items')
  }
  return await response.json()
}

/* export async function equipItem(characterId: number, itemId: string) {
  const url = `https://l2pevents.cz/gamification/equip_item.php`
  const token = localStorage.getItem('jwt_token')
  console.log(token)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ character_id: characterId, item_id: itemId }),
  })

  console.log('equip_item status:', response.status)
  let data: any
  try {
    data = await response.json()
    console.log('equip_item body:', data)
  } catch {}

  if (!response.ok) {
    throw new Error(
      `Failed to equip item: ${response.status} ${JSON.stringify(data)}`,
    )
  }

  return data
}
 */

export async function equipItem(characterId: number, itemId: string) {
  const res = await api.post(`/equip_item.php`, {
    character_id: characterId,
    item_id: itemId,
  })
  return res.data
}
