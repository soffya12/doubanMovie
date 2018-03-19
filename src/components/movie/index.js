import React from 'react'

import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;
import { Link, Route, Switc } from 'react-router-dom'

import MovieList from './MovieList'


export default class Movie extends React.Component {
  render() {
    return (
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <Menu.Item key="1"><Link to="/movielist/in_theaters">正在热映</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/movielist/coming_soon">即将上映</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/movielist/top250">top250</Link></Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Route path="/movielist/:movieType/:page?" component={MovieList}></Route>
        </Content>
      </Layout>
    )
  }
} 