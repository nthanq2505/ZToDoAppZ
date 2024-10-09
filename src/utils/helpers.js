export const getCurrentUser = () => {
  return (
    localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser')
  )
}
