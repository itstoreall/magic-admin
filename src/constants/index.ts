export const ARTICLE_HEADER_FIELDS_ADD = '*_add_article_header_fields';
export const ARTICLE_ELEMENTS_ADD = '*_add_article_elements';
export const ARTICLE_HEADER_FIELDS_EDIT = '**_edit_article_header_fields';
export const ARTICLE_ELEMENTS_EDIT = '**_edit_article_elements';
export const ARTICLE_TAGS_EDIT = '**_edit_article_tags';

export const DEFAULT_PUBLIC_IMAGE = '/defaultPublicImg.jpg';
export const IPFS_WEB3_STORAGE_DEFAULT_CID =
  'bafybeibyrbaeduroa4p46rf7qm34bcbkqpcxfpmyk5g6lviagksaxxb4uy';

export const MONTHS = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек'
];

export const SITE_ASTRAIA = 'https://astraia.storeall.com.ua/';
export const SITE_HEALTHY = 'https://healthy.storeall.com.ua/';

const getIpfsUrl = (blog: string) => {
  const opts = process.env.REACT_APP_OPTIONS;
  const ipfsLink = process.env.REACT_APP_IPFS_LINK;

  if (opts) {
    const blogs = opts.split(' ');
    const blogOne = blogs[0];
    const blogTwo = blogs[1];

    return blog === blogOne
      ? `${ipfsLink}/${blogOne}-image.jpg`
      : `${ipfsLink}/${blogTwo}-image.jpg`;
  }
};

const fns = {
  getIpfsUrl
};

export default fns;
