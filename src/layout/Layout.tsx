import { retrieveHelmetData } from '@/utils/functions';
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { appConfig } from '@/config/appConfig';



const Layout = () => {
  // ------------- HOOKS
  const location = useLocation(); 
  // ------------- DATA
  const metadataHelmetInfo = retrieveHelmetData(location.pathname);

  return (
    <React.Fragment>
      {/* HELMET DATA */}
       <Helmet>
        <meta charSet="utf-8" />
        {
          metadataHelmetInfo && (
            <React.Fragment>
              <title>{metadataHelmetInfo.title}</title>
              <meta name="title" content={metadataHelmetInfo.title} />
              <meta name="description" content={metadataHelmetInfo.description} />
              <meta name="keywords" content={metadataHelmetInfo.keywords.join(', ')} />
              {metadataHelmetInfo.route && <link rel="canonical" href={`${appConfig.appDeployedUrl}/${metadataHelmetInfo.route}`} />}
            </React.Fragment>
          )
        }
      </Helmet>
      {/* OUTLET COMPONENT */}
      <Outlet />
    </React.Fragment>
  )
}

export default Layout
