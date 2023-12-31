import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { IArticle } from '../../../../interfaces';
import { IArticleListProps } from '../../../../interfaces/articleList';
import GET_ARTICLES from '../../../../gql/getArticles';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { removeDataTypename } from '../../../../utils/removeDataTypename';
import s from './ArticleList.module.scss';
import Spinner from '../../../Loading/Spinner';
import ImageHandler from './ImageHandler';
// import useFetchArticleById from '../../../../hooks/useFetchArticleById';

const ArticleList = ({ handleOpenDetails }: IArticleListProps) => {
  const { access, articles, setLabel, setArticles } = useGlobalContext();

  const [getArticles, { loading }] = useLazyQuery(GET_ARTICLES);

  const imgFilter = () => (true ? 50 : 0); // 'dark' theme

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await getArticles({ variables: { blog: access?.blog } });
      if (data) setArticles(removeDataTypename(data.articles) as IArticle[]);
    } catch (e) {
      console.error(e);
    }
  };

  // const res = useFetchArticleById('astraia', '64bd3c406a886bf9a12e6a66');
  // console.log('----->', res.data);

  const showDetails = (art: IArticle) => {
    setLabel('edit');
    handleOpenDetails(art);
  };

  if (loading) return <Spinner />;

  return (
    <div className={s.articleList}>
      <ul className={`${s.list}`}>
        {articles.map((art: IArticle) => (
          <li key={art.id} className={s.item} onClick={() => showDetails(art)}>
            <div className={s.card}>
              <div className={s.thumb}>
                <ImageHandler
                  cid={art.ipfs}
                  alt={art.title}
                  grayscale={imgFilter()}
                />
              </div>
              <div className={s.meta}>
                <h3>{art.title}</h3>
                <p className={s.description}>{art.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
