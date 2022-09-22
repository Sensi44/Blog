import { connect } from 'react-redux';

import { Posts } from '../components/Posts';
import { Post } from '../components/Post';

const mapStateToProps = (state) => {
  const { loading, error } = state;
  return {
    loading,
    error,
  };
};

export const PostsBox = connect(mapStateToProps, null)(Posts);
export const PostBox = connect(mapStateToProps, null)(Post);
