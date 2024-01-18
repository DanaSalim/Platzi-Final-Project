import React from 'react';
import { ConfigProvider } from 'antd';
import PropTypes from 'prop-types';

export const Providers = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Roboto',
          colorPrimaryBg: '#001529',
          colorPrimary: '#f2cd00',
        },
        components: {
            Typography: {
                colorTextHeading : '#f2cd00'
            },
            Layout: {
                footerBg: '#001529',
            },
            Menu: {
                colorBgContainer: '#001529',
                colorText: '#FFFFFF',
            }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
};

Providers.propTypes = {
  children: PropTypes.object,
};
