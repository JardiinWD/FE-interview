import { ProductApi } from '@/api'
import { DataLoop, FlexContainer, Image, Typography } from '@/components/atoms'
import { useQuery } from '@tanstack/react-query'
import React, { JSX } from 'react'

const Home: React.FC = (): JSX.Element => {
  // -------------- API CALL
  const { isPending, data: apiData } = useQuery({
    queryKey: [''],
    queryFn: async () => {
      // Call the API to get the products and destructure the response
      const { data, error, status } = await ProductApi.getProducts()
      return {
        data: data,
        error: error,
        status: status
      }
    }
  })
  


  return (
    <FlexContainer flexContainerId='homepage' direction='column' justify='center' align='center' gap={2} className='h-screen'>
      <Typography
        tagAs="h1"
        text={`${isPending ? 'Loading...' : 'Hello World'}`}
        textColor="text-primary_blue_400"
        weight="bold"
        className="text-center"
      />
      <FlexContainer flexContainerId='data-loop' direction='row' justify='center' align='center' gap={2}>
        <DataLoop 
          render={(_, item) => (
            <Image 
              src={item.images[0]}
              alt={item.description}
              className="rounded-lg"
              htmlHeight={300}
              htmlWidth={300}
              fit="contain"
            />
          )} 
          eachData={apiData?.data?.products} 
        />
      </FlexContainer>
    </FlexContainer>
  )
}

export default Home
