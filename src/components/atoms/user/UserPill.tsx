import { useAuthStore } from '@/store'
import React, { JSX } from 'react'
import { Link } from 'react-router-dom'
import Image from '../Image'

const UserPill: React.FC = (): JSX.Element => {
  // ------------ ZUSTAND STORE
  const allUserData = useAuthStore((state) => state.allUserData)

  return (
    <Link
      state={{ userData: allUserData }}
      to="/user-info"
      className="flex items-center rounded-full bg-primary_white_200"
    >
      <Image
        src={allUserData?.image as string}
        alt="User Image"
        htmlWidth={50}
        htmlHeight={50}
      />
    </Link>
  )
}

export default UserPill
