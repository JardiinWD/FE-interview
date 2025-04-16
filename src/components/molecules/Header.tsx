import { Images } from '@/assets/images'
import {
  CartHeaderIcon,
  FlexContainer,
  Image,
  UserPill
} from '@/components/atoms'
import { appConfig } from '@/config/appConfig'
import React, { JSX } from 'react'
import { Link, useLocation } from 'react-router-dom'

appConfig

const Header: React.FC = (): JSX.Element => {
  // ------------- HOOKS
  const location = useLocation()

  return (
    <FlexContainer
      direction="row"
      justify="center"
      align="center"
      flexContainerId="header"
      className="w-full relative h-28 bg-primary_yellow_500 text:primary_white_200"
    >
      {/* LOGO */}
      <Link className="absolute left-2" to="/">
        <Image src={Images.Logo} alt="Logo" htmlWidth={100} htmlHeight={100} />
      </Link>
      {/* LINKS */}
      {/* <Link className="lg:flex hidden" to="/">
        <Typography
          text="Products"
          tagAs="h4"
          weight="bold"
          textColor={`${['/'].includes(location.pathname) ? 'text-white' : 'text-primary_black_600'}`}
        />
      </Link> */}
      <FlexContainer
        direction="row"
        flexContainerId="header-cart-and-user-pill"
        justify="center"
        align="center"
        gap={8}
        className="absolute right-4"
      >
        {/* CART BUTTON */}
        <CartHeaderIcon />
        {/* USER PILL */}
        <UserPill />
      </FlexContainer>
    </FlexContainer>
  )
}

export default Header
