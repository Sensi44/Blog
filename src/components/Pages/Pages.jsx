import React, { useState } from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.min.css';
import './Pages.scss';

function Pages(props) {
  const { changePage, pages } = props;

  const [current, setCurrent] = useState(1);

  const onChange = (page) => {
    setCurrent(page);
    changePage(page);
  };

  return (
    <div className='pages_container'>
      <div className='pages'>
        <Pagination
          current={current}
          onChange={onChange}
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
  changePage: PropTypes.func,
  pages: PropTypes.number,
};

export default Pages;
