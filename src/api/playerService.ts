import api from './authService'

export async function fetchPlayer() {
  const response = await api.get('/player_info.php')
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

export async function fetchOwnItems() {
  const response = await api.get('/own_items.php')
  return response.data
}

export async function fetchEquipedItems() {
  const response = await api.get('/equiped_items.php')
  return response.data
}

export async function equipItem(characterId: number, itemId: string) {
  const response = await api.post(`/equip_item.php`, {
    character_id: characterId,
    item_id: itemId,
  })
  return response.data
}

export async function fetchNotOwnedAchievements(characterId: number) {
  const response = await api.get(`/not_owned_achievements.php`, {
    params: { character_id: characterId },
  })
  return response.data
}

export async function fetchOwnedAchievements() {
  const response = await api.get(`/own_achievements.php`)
  return response.data
}

export async function updateAchievementStatus(
  achievementId: number,
  achievementStatus: string,
) {
  const response = await api.post(`/update_achievement_status.php`, {
    achievementId: achievementId,
    achievementStatus: achievementStatus,
  })
  return response.data
}

export async function fetchInUseAchievements() {
  const response = await api.get('/in_use_achievements.php')
  return response.data
}
