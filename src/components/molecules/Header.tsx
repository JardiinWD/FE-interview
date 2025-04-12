import React, { JSX } from 'react'
import { FlexContainer, Image, Typography, Button } from '@/components/atoms'
import { Link, useLocation } from 'react-router-dom'
import { Images } from '@/assets/images'
import Lottie from 'lottie-react'
import { Lotties } from '@/assets/lotties'

const Header: React.FC = (): JSX.Element => {
  // ------------- HOOKS
  const location = useLocation()

  return (
    <FlexContainer
      direction="row"
      justify="center"
      align="center"
      className="w-full relative h-28 bg-primary_yellow_500 text:primary_white_200"
    >
      {/* LOGO */}
      <Image
        src={Images.Logo}
        alt="Logo"
        className="absolute left-2"
        htmlWidth={100}
        htmlHeight={100}
      />
      {/* LINKS */}
      <Link to="/">
        <Typography
          text="Products"
          tagAs="h4"
          weight="bold"
          textColor={`${['/'].includes(location.pathname) ? 'text-white' : 'text-primary_black_600'}`}
        />
      </Link>
      {/* CART BUTTON */}
      {!['/cart'].includes(location.pathname) && (
        <Link className="absolute right-2" to="/cart">
          <Button
            variant="primary"
            buttonType="button"
            className="bg-white"
            buttonId="cart-button"
          >
            <Lottie
              className="h-[2rem] w-[2rem]"
              animationData={Lotties.CartLottie}
              loop
              autoplay
            />
          </Button>
        </Link>
      )}
    </FlexContainer>
  )
}

export default Header
