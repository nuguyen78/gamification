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
