import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import GET_ARTICLE_BY_ID from '../gql/getArticleById';

const useFetchArticleById = (blog: string, id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState([]);
  const client = useApolloClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_ARTICLE_BY_ID,
          variables: { blog, id },
        });

        if (data && data?.getArticleById) {
          setArticle(data?.getArticleById);
        }

        setIsLoading(false);
      } catch (e) {
        console.error('Error in useFetchArticleById:', e);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, data: article };
};

export default useFetchArticleById;
