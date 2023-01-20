import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, date,source } = this.props;
        return (
            <>
                <div>
                    
                    <div className="card" style={{ width: "18rem" }}>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                       {source.name}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                        <img src={imageUrl ? imageUrl : 'https://www.northampton.ac.uk/wp-content/uploads/2018/11/default-svp_news.jpg'} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <a href={newsUrl} target='_blank' className="btn btn-secondary">Read More</a>
                            <p className='text-muted'>{new Date(date).toUTCString()}</p>
                        </div>
                    </div>

                </div>

            </>


        )
    }
}

export default NewsItem
