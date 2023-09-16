import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { IArticle } from '../../../interfaces';
import GET_ARTICLES from '../../../gql/getArticles';
import { removeDataTypename } from '../../../utils/removeDataTypename';
import defaultImage from '../../../assets/images/defaultImage.jpg';
import s from './ArticleList.module.scss';
import Spinner from '../../Loading/Spinner';

export const WEB3_STORAGE = 'ipfs.dweb.link/astraia-image.jpg';

export interface IImageHandlerProps {
  cid: string;
  alt: string;
  grayscale: number;
}

const ipfs = WEB3_STORAGE;

const ArticleList = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  const [isAdmin, { loading }] = useLazyQuery(GET_ARTICLES);

  const imgFilter = () => (true ? 50 : 0); // 'dark'

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await isAdmin();
      if (data) setArticles(removeDataTypename(data.articles) as IArticle[]);
    } catch (e) {
      console.error(e);
    }
  };

  console.log('articles', articles);

  const ImageHandler = ({ cid, alt, grayscale }: IImageHandlerProps) => {
    const setImageSrc = (cid: string) =>
      cid ? `https://${cid}.${ipfs}` : defaultImage;

    return (
      <img
        src={setImageSrc(cid)}
        alt={alt}
        width={900}
        height={450}
        style={{
          width: '100%',
          height: 'auto',
          filter: `grayscale(${grayscale}%)`,
        }}
      />
    );
  };

  if (loading) return <Spinner />;

  return (
    <div className={s.articleList}>
      <ul className={`${s.list} ${s['dark']}`}>
        {articles.map((art: IArticle) => (
          <li key={art.id} className={s.item}>
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
