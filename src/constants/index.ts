export const ARTICLE_HEADER_FIELDS_ADD = '*_add_article_header_fields';
export const ARTICLE_ELEMENTS_ADD = '*_add_article_elements';
export const ARTICLE_HEADER_FIELDS_EDIT = '**_edit_article_header_fields';
export const ARTICLE_ELEMENTS_EDIT = '**_edit_article_elements';

export const DEFAULT_PUBLIC_IMAGE = '/defaultPublicImg.jpg';
export const IPFS_WEB3_STORAGE_ASTRAIA = 'ipfs.dweb.link/astraia-image.jpg';
export const IPFS_WEB3_STORAGE_HEALTHY = 'ipfs.dweb.link/healthy-image.jpg';
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
  'дек',
];

export const SITE_ASTRAIA = 'https://astraia.storeall.com.ua/';
export const SITE_HEALTHY = 'https://healthy.storeall.com.ua/';

const getIpfsUrl = (blog: string) =>
  blog === 'astraia' ? IPFS_WEB3_STORAGE_ASTRAIA : IPFS_WEB3_STORAGE_HEALTHY;

const fns = {
  getIpfsUrl,
};

export default fns;
