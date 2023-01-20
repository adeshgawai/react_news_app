import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props)
        console.log('this is constructor for class');
        this.nextPage = this.nextPage.bind(this);
        this.state = {
            articles: [],
            page: 1,
            loading: false,
            totalResults: 0
        }
        // articles = [];
        document.title = `${this.props.category} | GateNews`
    }

    async updateNews() {
        this.props.setProgress(0)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=857631b83bf944c39c53a62c5c3e6989&page=1&pageSize=${this.props.pageSize}`;
        //this is waiting inside in an async function
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30)
        //convert this data to json format
        let parsedData = await data.json();
        this.props.setProgress(50)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)


    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=857631b83bf944c39c53a62c5c3e6989&page=1&pageSize=${this.props.pageSize}`;
        // //this is waiting inside in an async function
        // this.setState({loading:true});
        // let data = await fetch(url);
        // //convert this data to json format
        // let parsedData = await data.json();
        // this.setState({ 
        //     articles: parsedData.articles,
        //     loading:false
        //  })
        // console.log(parsedData);
        // console.log(this.state.articles.page)
        this.updateNews()


    }
    previousPage = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=857631b83bf944c39c53a62c5c3e6989&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // //this is waiting inside in an async function
        // this.setState({loading:true});
        // let data = await fetch(url);
        // //convert this data to json format
        // let parsedData = await data.json();
        // this.setState({
        //  page:this.state.page-1,
        //  articles: parsedData.articles,
        //  loading:false
        // })
        this.setState({
            page: this.state.page - 1
        });
        this.updateNews();
    }
    nextPage = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=857631b83bf944c39c53a62c5c3e6989&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        // //this is waiting inside in an async function
        // this.setState({loading:true});
        // let data = await fetch(url);
        // //convert this data to json format
        // let parsedData = await data.json();
        // this.setState({
        //  page:this.state.page+1,
        //  articles:
        //   parsedData.articles,
        // loading:false
        // })
        // console.log(this.state.page);
        this.setState({
            page: this.state.page + 1
        })
        this.updateNews()
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=857631b83bf944c39c53a62c5c3e6989&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        //this is waiting inside in an async function
        this.setState({ loading: true });
        let data = await fetch(url);
        //convert this data to json format
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    };
    render() {
        return (

            <div className='container text-center'>
                <h1 className='mt-4'>Get News - Todays {this.props.category} top headlines</h1>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className='row align-items-start mt-5'>
                            {this.state.articles.map((elements) => {
                                return <div className='col-md-4' key={elements.url}>
                                    <NewsItem title={elements.title ? elements.title.slice(0, 45) : ''} description={elements.description ? elements.description.slice(0, 85) : ''} imageUrl={elements.urlToImage} newsUrl={elements.url} date={elements.publishedAt} source={elements.source} />
                                </div>
                                // console.log(elements)
                            })}
                            {/* <div className='col-md-4'>
                        <NewsItem title="my title" description="it is the news desc" imageUrl='https://ichef.bbci.co.uk/news/1024/branded_news/A0E4/production/_128288114_fl_07_the_last_of_us_s01.jpg' />
                      </div> */}
                        </div>
                    </div>

                </InfiniteScroll>
            </div>


        )
    }
}
