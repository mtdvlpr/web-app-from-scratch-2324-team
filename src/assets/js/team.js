/**
 * Sets the team article to an error state
 */
export const setTeamError = (onRetry) => {
  const errorContainer = document.getElementById('team-error')
  errorContainer.innerHTML = ''
  const msg = document.createElement('p')
  msg.textContent = 'Failed to load team data...'
  errorContainer.appendChild(msg)
  if (onRetry) {
    const button = document.createElement('button')
    button.textContent = 'Retry'
    button.onclick = onRetry
    errorContainer.appendChild(button)
  }
}
