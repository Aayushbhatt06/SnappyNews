import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  
  constructor(){
    super()
    this.state = {
      articles: [],
      loading: false
    }
  }

  async componentDidMount(){
    let url = "https://newsdata.io/api/1/latest?apikey=pub_0e33a27da4714910a8ce37229cba24e4&q=english"
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({articles : parseData.results})
  }
  render() {

    return (
      <div>
        <div className="container my-4">
          <div className="row md-3">
            {this.state.articles.map((element)=>{
              return <div className="col my-3" key={element.article_id}>
                <NewsItem title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,100):""} imgUrl={element.image_url} newsUrl={element.link}/>
              </div>
            })}
            
          </div>
        </div>
      </div>
    )
  }
}

export default News