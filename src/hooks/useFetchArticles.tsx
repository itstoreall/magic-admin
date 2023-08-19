import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import GET_ARTICLES from '../gql/getArticles';

const useFetchArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const client = useApolloClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: _data } = await client.query({
        query: GET_ARTICLES,
      });

      if (_data && _data?.articles) {
        setData(_data.articles);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { isLoading, data };
};

export default useFetchArticles;
