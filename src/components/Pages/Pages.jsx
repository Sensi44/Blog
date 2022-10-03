import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import 'antd/dist/antd.min.css';
import './Pages.scss';

function Pages(props) {
  const { pages, current } = props;
  const navigate = useNavigate();
  return (
    <div className='pages_container'>
      <div className='pages'>
        <Pagination
          current={current}
          onChange={(page) => navigate(`/articles/page-${page}`)}
          total={pages * 2}
          hideOnSinglePage={true}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}

Pages.defaultProps = {};

Pages.propTypes = {
  current: PropTypes.number,
  pages: PropTypes.number,
};

export default Pages;
