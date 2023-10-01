import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useGlobalContext } from '../context/GlobalContext';
import GET_ARTICLES from '../gql/getArticles';

const useFetchArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const client = useApolloClient();

  const { access } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      const { data: _data } = await client.query({
        query: GET_ARTICLES,
        variables: { blog: access?.blog },
      });

      if (_data && _data?.articles) {
        setData(_data.articles);
      }

      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, data };
};

export default useFetchArticles;
