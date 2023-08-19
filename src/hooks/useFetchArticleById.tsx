import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import GET_ARTICLE_BY_ID from '../gql/getArticleById';

const useFetchArticleById = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const client = useApolloClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: _data } = await client.query({
        query: GET_ARTICLE_BY_ID,
        variables: { id },
      });

      console.log('---< data', data);

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

export default useFetchArticleById;
