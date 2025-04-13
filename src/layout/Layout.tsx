import { retrieveHelmetData } from '@/utils/functions'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { appConfig } from '@/config/appConfig'
import { Header } from '@/components/molecules'
import { Button, FlexContainer } from '@/components/atoms'

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
      gap={3}
      direction="column"
      justify="flex-start"
      align="flex-start"
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
        <Link to="/">
          <Button
            variant="primary"
            buttonId="go-back-button"
            buttonType="button"
            onClick={() => {}}
          >
            Go Back
          </Button>
        </Link>
      )}
      {/* OUTLET COMPONENT */}
      <Outlet />
    </FlexContainer>
  )
}

export default Layout
