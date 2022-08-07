import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGlobalContext } from "../context";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const {dark} = useGlobalContext();
  

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const updateNews =async()=> {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
   
    props.setProgress(100);
  }

  useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category )} - NewsToday`;
      updateNews();
      // eslint-disable-next-line
  }, [])

    // async componentDidMount() {

    //let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=799a0762172042e8bc0ef381c787b1b7&page=1&pageSize=${props.pageSize}`;
    //this.setState({loading:true});
    //let data = await fetch(url);
    //let parsedData = await data.json();
    //console.log(parsedData);
    //this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false})
    
    //this.updateNews();
    //  }


  // const handlePrevClick = async () => {
    //let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=799a0762172042e8bc0ef381c787b1b7&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    //this.setState({loading:true});
    //let data = await fetch(url);
    //let parsedData = await data.json();
    //console.log(parsedData);
    //this.setState({
    //      page: this.state.page - 1,
    //      articles: parsedData.articles,
    //      loading: false
    //
    //  })
  //   setPage(page-1)
  //   updateNews();
  // };


  // const handleNextClick = async () => {
    //if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){
    //
    //
    //}
    //else{
    //    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=799a0762172042e8bc0ef381c787b1b7&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //this.setState({loading:true});
    //    let data = await fetch(url);
    //let parsedData = await data.json();
    //
    //this.setState({
    //      page: this.state.page + 1,
    //      articles: parsedData.articles,
    //      loading: false
    //
    //  })
    //}
    
  //   setPage(page+1)
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    
     //this.updateNews()
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    
    console.log(url);
  };

  
  
    return (
      <div 
      className={dark?"bg-secondary mt-200":"bg-light mt-200"} 
      style={{marginTop:"56px"}}>
        
        <h2 className={dark?"text-white text-center":"text-black text-center"}><strong>{capitalizeFirstLetter(props.category)}</strong> News</h2>
        
        

        <InfiniteScroll
          dataLength={articles?.length}
          next={fetchMoreData}
          hasMore={articles?.length !== totalResults}
          loader={<Spinner/>}
        >

        { loading? <Spinner/> :
        <div className="container"> 

          <div className="row">
            {articles?.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 48) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 90)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
          }
        </InfiniteScroll>
        
        {/*<div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>*/}
      </div>
    );
  
}

  News.defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

export default News;
