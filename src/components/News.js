import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {
  constructor() {
    super()
    this.state = {
      page: 1,
      articles: [],
      loading: false
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/everything?q=${this.props.country}&apiKey=1b7fc29662bb4bd0ab71c268ddf69b8b&page=1&pageSize=${this.props.pageSize}&language=en`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({
      articles: parseData.articles,
      loading: false,
      totalResults: parseData.totalResults
    })
  }

  handleprev = async () => {
    let url = `https://newsapi.org/v2/everything?q=${this.props.country}&apiKey=1b7fc29662bb4bd0ab71c268ddf69b8b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}&language=en`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      loading: false
    })
  }

  handlenext = async () => {
    let url = `https://newsapi.org/v2/everything?q=${this.props.country}&apiKey=1b7fc29662bb4bd0ab71c268ddf69b8b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&language=en`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({
      articles: parseData.articles,
      page: this.state.page + 1,
      loading: false
    })
  }

  render() {
    return (
      <div>
        <div className="container my-4">
          {this.state.loading && <Spinner />}
          <div className="row md-4">
            {this.state.articles.map((element) => {
              return (
                <div className="col my-3" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 50) : ""}
                    description={element.description ? element.description.slice(0, 100) : ""}
                    imgUrl={element.urlToImage ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlS2MyP82wFMKpr7e1CxfyAoqgDRx0Bg0seg&s"}
                    newsUrl={element.url}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-around mb-4">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handleprev}
          >
            &larr; Prev
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handlenext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    )
  }
}

export default News
