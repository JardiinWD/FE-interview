
import { ProductApi } from '@/api';
import { useQuery } from '@tanstack/react-query';


const Home = () => {
  // -------------- API CALL
  const { isPending: apiPendingState, data: apiData } = useQuery({
    queryKey: [''],
    queryFn: async () => {
      // Call the API to get the products and destructure the response
      const {data, error, status} = await ProductApi.getProducts()
      return {
        data: data,
        error: error,
        status: status
      }
    }
  })
  

  console.log('apiData', apiData);
  console.log('apiPendingState', apiPendingState);


  return <div className='text-red-400'><p className='text-red-500'>Homepage</p></div>
}

export default Home
