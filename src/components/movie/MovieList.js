import React from 'react'

// 导入 fetch-jsonp 实现跨域获取数据
// import fetchJsonp from 'fetch-jsonp'

import { Layout, Card, Spin, Alert, Rate, Pagination } from 'antd'

// 导入自定义样式
import '../../css/movielist.css'

// 获取数据的过程：
// 1 进入页面就要获取数据
//    在 constructor 中获取到电影类型和当前页，然后调用 _fetchData 获取分页数据

// 2 点击分页按钮
//    在 _changePage 分页的点击事件中，获取到当前页，然后调用 props.histroy.push() 方法修改路由
//    路由修改后，会触发当前组建的 componentWillReceiveProps 钩子函数
//    然后调用 _fetchData 获取分页数据

// 3 点击电影类型菜单
//    直接触发当前组件的 componentWillReceiveProps 钩子函数
//    然后调用 _fetchData 获取分页数据

export default class MovieList extends React.Component {
  constructor(props) {
    super(props)
    
    // console.log(props.match.params.movieType);
    // 将电影类型存储到this（实例）中，方便获取
    this.movieType = props.match.params.movieType
    // 当前第几页
    this.curPage = props.match.params.page - 0 || 1
    console.warn('constructor: ', this.movieType, this.curPage);

    this.state = {
      movieData: {},    // 电影数据
      isLoaded: false   // 数据是否加载完成
    }
  }

  // 切换路由的时候，会触发这个钩子函数
  componentWillReceiveProps(nextProps) {
    console.warn('componentWillReceiveProps');
    // 修改curPage
    this.curPage = nextProps.match.params.page - 0 || 1

    // 切换菜单，展示loading效果
    this.setState({
      isLoaded: false
    })
    // 接收到最新的电影类型时，重新修改this（实例）中的电影类型
    this.movieType = nextProps.match.params.movieType
    // console.log(nextProps.match.params.movieType);
    this._fetchData()
  }

  /* componentDidMount() {
    console.warn('componentDidMount');
    // 发起请求，获取数据
    // 参数：URL 接口地址
    // fetch() 方法会返回一个Promise对象
    // fetch('http://vue.studyit.io/api/getlunbo')

    // 使用 fetch-jsonp 解决跨域问题
    // fetchJsonp('https://api.douban.com/v2/movie/in_theaters')

    this._fetchData()
  } */


  // 发送请求获取数据
  _fetchData() {
    console.warn('_fetchData 获取数据');
    // 分页公式：start = (页码 - 1) * 每页大小
    // 0 1 2 3 4 5
    // 6 7 8 9 10 11
    // 12 13 14 15 16 17
    const start = (this.curPage - 1) * 6

    fetch(`/api/movie/${this.movieType}?start=${start}&count=6`)
      .then(res => {
        // 调用res.json()方法：用来将获取到的内容转化为JSON格式
        return res.json()
      })
      .then(data => {
        // 参数dataL：才是接口中返回的数据
        console.log(data);

        this.setState({
          movieData: data,
          isLoaded: true
        })
      })
  }

  render() {
    // loading
    if (!this.state.isLoaded) {
      return (
        <Spin tip="Loading...">
          <Alert
            message="友情提示:"
            description="数据疯狂加载中, 请稍候..."
            type="info"
          />
        </Spin>
      )
    }

    return (
      <Layout>
        <Layout className="movie-list">
          {
            this._renderMoiveList()
          }
          
          {/* 分页组件： */}
          <Pagination 
            current={this.curPage}
            defaultCurrent={1} 
            defaultPageSize={6} 
            total={this.state.movieData.total} 
            onChange={(page) => this._changePage(page) } />
        </Layout>
      </Layout>
    )
  }

  // 分页获取数据
  _changePage(page) {
    // curPage 表示当前页
    this.curPage = page

    // 路由跳转
    // 1 当点击分页后，调用 push 方法修改了路由
    // 2 路由发生改变，当前组件的 componentWillRecieveProps 钩子函数就会执行
    // 3 就会调用 _fetchData() 获取数据
    // 4 就根据当前也 curPage 获取当前页的数据
    this.props.history.push(`/movielist/${this.movieType}/${page}`)
  }

  // 渲染电影列表数据
  _renderMoiveList() {
    console.log(this.state.movieData);
    return this.state.movieData.subjects.map(item => {
      return (
        <Card
          hoverable
          key={item.id}
          cover={<img alt="example" src={item.images.small} />}
          onClick={() => this.props.history.push(`/movielist/detail/${item.id}`)}
        >
          <h3>{ item.title }</h3>
          <p>电影类型：{ item.genres.join(',') }</p>
          <p>上映年份：{ item.year }</p>
          <Rate disabled defaultValue={item.rating.average / 2} />
        </Card>
      )
    })
  }
}