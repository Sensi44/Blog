import { connect } from 'react-redux';

import { Posts } from '../components/Posts';

const mapStateToProps = (state) => {
  const { loading } = state;
  return {
    loading,
  };
};

const PostsBox = connect(mapStateToProps, null)(Posts);

export default PostsBox;
