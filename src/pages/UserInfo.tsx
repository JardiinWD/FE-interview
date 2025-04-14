import React from 'react'
import { useLocation } from 'react-router-dom'

const UserInfo = () => {
  // -------------- CUSTOM HOOK
  const location = useLocation()

  // -------------- DATA
  const { userData } = location.state

  return <div>User Info</div>
}

export default UserInfo
