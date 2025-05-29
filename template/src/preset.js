import React from 'react';
import { preset as fetchPreset } from '@kne/react-fetch';
import { Spin, Empty, message } from 'antd';
import createAjax from '@kne/axios-fetch';
import { preset as remoteLoaderPreset } from '@kne/remote-loader';
import { getApis } from '@components/Apis';

window.PUBLIC_URL = window.runtimePublicUrl || process.env.PUBLIC_URL;

const baseApiUrl = window.runtimeApiUrl || '';

export const globalInit = async () => {
    const ajax = createAjax({
        baseUrl: baseApiUrl,
        getDefaultHeaders: () => {
            //这里设置获取token方法
            return {};
        },
        errorHandler: error => message.error(error)
    });
    fetchPreset({
        ajax,
        loading: (
          <Spin
            delay={500}
            style={{
                position: 'absolute',
                left: '50%',
                padding: '10px',
                transform: 'translateX(-50%)'
            }}
          />
        ),
        error: null,
        empty: <Empty />,
        transformResponse: response => {
            const { data } = response;
            response.data = {
                code: data.code === 0 ? 200 : data.code,
                msg: data.msg,
                results: data.data
            };
            return response;
        }
    });
    const registry = {
        url: "https://uc.fatalent.cn", tpl: "{{url}}/packages/@kne-components/{{remote}}/{{version}}/build",
    };

    const componentsCoreRemote = {
        ...registry,
        remote: 'components-core',
        defaultVersion: '0.3.20'
    };
    remoteLoaderPreset({
        remotes: {
            default: componentsCoreRemote,
            'components-core': componentsCoreRemote,
            'components-iconfont': {
                ...registry,
                remote: 'components-iconfont',
                defaultVersion: '0.2.1'
            }, '<%=name%>': process.env.NODE_ENV === 'development' ? {
                remote: '<%=name%>', url: '/', tpl: '{{url}}'
            } : {
                ...registry, remote: '<%=name%>', defaultVersion: process.env.DEFAULT_VERSION
            }
        }
    });

    return {
        ajax,
        apis: Object.assign({}, getApis()),
    };
};
