import { Icons } from '@/assets/icons'
import { Button, FlexContainer } from '@/components/atoms'
import { Header } from '@/components/molecules'
import { appConfig } from '@/config/appConfig'
import { retrieveHelmetData } from '@/utils/functions'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  // ------------- HOOKS
  const location = useLocation()
  // ------------- DATA
  const metadataHelmetInfo = React.useMemo(
    () => retrieveHelmetData(location.pathname),
    [location.pathname]
  )

  return (
    <FlexContainer
      direction="column"
      justify="flex-start"
      align="flex-start"
      className="relative w-full h-full"
      flexContainerId="layout"
    >
      {/* HELMET DATA */}
      <Helmet>
        <meta charSet="utf-8" />
        {metadataHelmetInfo && (
          <React.Fragment>
            <title>{metadataHelmetInfo.title}</title>
            <meta name="title" content={metadataHelmetInfo.title} />
            <meta name="description" content={metadataHelmetInfo.description} />
            <meta
              name="keywords"
              content={metadataHelmetInfo.keywords.join(', ')}
            />
            {metadataHelmetInfo.route && (
              <link
                rel="canonical"
                href={`${appConfig.appDeployedUrl}/${metadataHelmetInfo.route}`}
              />
            )}
          </React.Fragment>
        )}
      </Helmet>
      {/* HEADER */}
      <Header />
      {/* GO Back Button */}
      {!['/'].includes(location.pathname) && (
        <Link className="absolute top-[7.5rem] left-2 p-2" to="/">
          <Button
            variant="primary"
            buttonId="go-back-button"
            buttonType="button"
          >
            <Icons.LeftArrow className="w-4 h-4" />
          </Button>
        </Link>
      )}
      {/* OUTLET COMPONENT */}
      <Outlet />
    </FlexContainer>
  )
}

export default Layout
