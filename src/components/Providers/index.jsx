import React from 'react';
import { ConfigProvider } from 'antd';

export const Providers = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Roboto',
          colorPrimaryBg: '#001529',
        },
        components: {
            Typography: {
                colorTextHeading : '#f2cd00'
            },
            Layout: {
                footerBg: '#001529',
                footerPadding: '10px 50px',
                paddingContentVertical: '20px',
                paddingContentHorizontal: '50px',
            }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
};

Providers.propTypes = {
  children: React.Children,
};
