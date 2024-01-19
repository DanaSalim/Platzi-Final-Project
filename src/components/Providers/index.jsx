import React from 'react';
import { ConfigProvider } from 'antd';
import PropTypes from 'prop-types';
import {AppContext} from '../../context/AppContext';
import useAppContext from '../../hooks/useAppContext';

export const Providers = ({ children }) => {
  const appContextValue = useAppContext();
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
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    </ConfigProvider>
  );
};

Providers.propTypes = {
  children: PropTypes.object,
};
