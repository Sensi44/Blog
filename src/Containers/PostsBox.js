import { connect } from 'react-redux';

import { Posts } from '../components/Posts';
import { Post } from '../components/Post';
import { SignUp } from '../components/SignUp';

const mapStateToProps = (state) => {
  const { loading, error, modalWindow } = state;
  return {
    loading,
    error,
    modalWindow,
  };
};

export const PostsBox = connect(mapStateToProps, null)(Posts);
export const PostBox = connect(mapStateToProps, null)(Post);
export const SignUpBox = connect(mapStateToProps, null)(SignUp);
