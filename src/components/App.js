import React from 'react'

import { Layout, Menu, Icon } from 'antd';
// const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

import { HashRouter as Router, Route, Link } from 'react-router-dom'

import Home from './home'
import About from './about'
import Movie from './movie'

import '../css/index.css'

export default class Moviecat extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/movielist/in_theaters">电影列表</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/about">关于</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            
            
            <Route path="/" exact component={Home} ></Route>
            <Route path="/movielist" component={Movie}></Route>
            <Route path="/about" component={About}></Route>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            豆瓣电影 ©2018 Created by soffya
          </Footer>
        </Layout>
      </Router>
    )
  }
}

