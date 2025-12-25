import React from 'react'
import './News.css'
import newsList from '../../../../data/news.json'
import BetaBadge from '../../../../components/common/BetaBadge'

const News:React.FC = () => {
  return (
    <div id='news-box'>
        <header>
            <h3>News</h3> <BetaBadge />
        </header>
        <main>
        {newsList.news.map(news=>{
            return(
                <div>
                    <span>{news.date}</span>
                    <h4>{news.title}</h4>
                    <a href="/">see full news</a>
                </div>
            )
        })}
        </main>
    </div>
  )
}

export default News
