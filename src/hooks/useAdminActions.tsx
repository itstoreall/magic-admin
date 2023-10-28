import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import GET_ALL_ADMINS from '../gql/getAllAdmins';
import GET_ALL_BLOGS from '../gql/getAllBlogs';
import GET_BLOG_TAGS from '../gql/getBlogTags';
import ADD_NEW_AUTHOR from '../gql/addNewAuthor';
import DELETE_AUTHOR_FROM_BLOG from '../gql/deleteAuthorFromBlog';
import ADD_AUTHOR_TO_BLOG from '../gql/addAuthorToBlog';
import UPDATE_BLOG_TAGS from '../gql/updateBlogTags';
// import { removeDataTypename } from '../utils/removeDataTypename';

type ActionFnType = (...args: any[]) => Promise<any>;

const labels = {
  getAllAdmins: 'get_all_admins',
  getAllBlogs: 'get_all_blogs',
  getBlogTags: 'get_blog_tags',
  addAdmin: 'add_admin',
  delAuthor: 'delete_author',
  addAuthor: 'add_author',
  updateTags: 'update_tags'
};

const GAA = GET_ALL_ADMINS;
const GAB = GET_ALL_BLOGS;
const GBT = GET_BLOG_TAGS;
const ANA = ADD_NEW_AUTHOR;
const DAFB = DELETE_AUTHOR_FROM_BLOG;
const AATB = ADD_AUTHOR_TO_BLOG;
const UBT = UPDATE_BLOG_TAGS;

const useAdminActions = () => {
  const [errMessage, setErrMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [getAllAdmins] = useLazyQuery(GAA);
  const [getAllBlogs] = useLazyQuery(GAB);
  const [getBlogTags, { refetch }] = useLazyQuery(GBT);

  const [addAdmin, { loading: addAdminLoad, error: addAdminErr }] =
    useMutation(ANA);

  const [deleteAuthor, { loading: delAuthorLoad, error: delAuthorErr }] =
    useMutation(DAFB);

  const [addAuthor, { loading: addAuthorLoad, error: addAuthorErr }] =
    useMutation(AATB);

  const [updateTags, { loading: updateTagsLoad, error: updateTagsErr }] =
    useMutation(UBT);

  useEffect(() => {
    addAdminErr && setErrMessage(addAdminErr.message);
    delAuthorErr && setErrMessage(delAuthorErr.message);
    addAuthorErr && setErrMessage(addAuthorErr.message);
    updateTagsErr && setErrMessage(updateTagsErr.message);
  }, [addAdminErr, delAuthorErr, addAuthorErr, updateTagsErr]);

  useEffect(() => {
    addAdminLoad && setLoading(addAdminLoad);
    delAuthorLoad && setLoading(delAuthorLoad);
    addAuthorLoad && setLoading(addAuthorLoad);
    updateTagsLoad && setLoading(updateTagsLoad);
  }, [addAdminLoad, delAuthorLoad, addAuthorLoad, updateTagsLoad]);

  const handleActions = (label: string, payload: any) => {
    errMessage && setErrMessage('');

    const action = async <F extends ActionFnType, P>(fn: F, payload: P) => {
      try {
        const { data } = await fn({ variables: payload });
        setLoading(false);
        if (data) return data;
      } catch (e) {
        console.error(e);
      }
    };

    switch (label) {
      case labels.getAllAdmins:
        return action(getAllAdmins, payload);
      case labels.getAllBlogs:
        return action(getAllBlogs, payload);
      case labels.getBlogTags:
        return action(getBlogTags, payload);
      case labels.addAdmin:
        return action(addAdmin, payload);
      case labels.delAuthor:
        return action(deleteAuthor, payload);
      case labels.addAuthor:
        return action(addAuthor, payload);
      case labels.updateTags:
        return action(updateTags, payload);
      default:
        return null;
    }
  };

  return { action: handleActions, refetch, error: errMessage, loading };
};

export default useAdminActions;
