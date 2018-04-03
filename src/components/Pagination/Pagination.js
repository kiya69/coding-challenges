import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
// import './styles.sass';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
}

const defaultProps = {
    initialPage: 1
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        let currPage = location.hash.split('/')[2] || this.props.initialPage;
        // let currPage = this.props.currentPage || this.props.initialPage;
        this.state = { pager: {}, currPage: currPage, maxPage: 10};
    }

      componentWillMount() {
          // set page if items array isn't empty
          if (this.props.items && this.props.items.length) {
              // this.setState({items: this.props.items});
              // this.setPage(this.props.currentPage ? this.props.currentPage : this.props.initialPage);

              // this.setPage(this.props.initialPage);
              this.setPage(this.state.currPage);
          }
      }

      componentDidUpdate(prevProps) {
          // reset page if items array has changed
          if (this.props.items !== prevProps.items) {
              // this.setPage(this.props.currentPage ? this.props.currentPage : this.props.initialPage);
              this.setPage(this.state.currPage);
              // this.setPage(this.props.initialPage);
          }
      }

    updatePage(){
      this.setPage(this.state.currPage);
    }
    componentDidMount() {
        window.addEventListener("resize", this.updatePage.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePage.bind(this));
    }
    setPage(page) {
        // var items = newProps ? newProps.items : this.state.items;
        var items = this.props.items;
        var pager = this.state.pager;
        // let page = this.state.currPage || _page
        // if(isFromClick){
        //   return;
        // }
        // debugger
        // browserHistory.push('/page/'+page);

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        hashHistory.replace('/page/'+page);
        this.setState({currPage: page})
        // get new pager object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });
        // this.setState({ pager: pager }, () => browserHistory.push('page/' + this.state.pager.currentPage));

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);

        // hashHistory.replace('/page/'+page);
        // console.log('this.props.location',this.props.location);
        // Router.replace('/page/'+page);
        // browserHistory.push('/page/'+page);

    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        console.log('this.state.currPage',this.state.currPage);
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 9;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage, maxPage;
        if(window.innerWidth >= 667){
          this.setState({maxPage: 10})
          maxPage = 10;
        } else {
          this.setState({maxPage: 3})
          maxPage = 3;
        }
        if (totalPages <= maxPage) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= Math.floor(maxPage / 2) + 1) {
                startPage = 1;
                endPage = maxPage;
            } else if (currentPage + Math.floor(maxPage / 2) >= totalPages) {
                startPage = totalPages - maxPage + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - Math.floor(maxPage / 2);
                endPage = currentPage + Math.floor(maxPage / 2);
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = []// _.range(startPage, endPage + 1);
        let page = startPage;
        for(var i = startPage; i <= endPage; i++){
          // debugger
          pages.push(page);
          page++;
        }

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
        // var paginationStyle= {
        //   position: 'absolute',
        //   left: '50%',
        //   transform: 'translate(-50%,0)',
        //   width: '616px'
        // }
// browserHistory.push('/page/'+page);

// <li className={(pager.currentPage == 1 ? 'disabled' : pager.currentPage)}>
//     <Link to={"/page/" + 1} onClick={() => this.setPage(1)}>First</Link>
// </li>
// <li className={pager.currentPage == 1 ? 'disabled' : ''}>
//     <Link to={"/page/" + ((pager.currentPage - 1) == 0 ? 1 : (pager.currentPage - 1))} onClick={() => this.setPage(pager.currentPage - 1)}>Previous</Link>
// </li>
// {pager.pages.map((page, index) =>
//     <li key={index} className={pager.currentPage == page ? 'active' : ''}>
//         <Link to={"/page/" + page} onClick={() => this.setPage(page)}>{page}</Link>
//     </li>
// )}
// <li className={pager.currentPage == pager.totalPages ? 'disabled' : ''}>
//     <Link to={"/page/" +  (parseInt(pager.currentPage) + 1) } onClick={() => this.setPage(pager.currentPage + 1)}>Next</Link>
// </li>
// <li className={pager.currentPage == pager.totalPages ? 'disabled' : ''}>
//     <Link to={"/page/" + pager.totalPages} onClick={() => this.setPage(pager.totalPages)}>Last</Link>
// </li>

  // <div className="pagination-wrapper">
  // </div>
        return (
          <div className="text-center">
            <ul className={"pagination" + (window.innerWidth < 667 ? " pagination-sm" : "")}>
                <li className={pager.currentPage == 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>First</a>
                </li>
                <li className={pager.currentPage == 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage == page ? 'active' : ''}>
                        <a onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage == pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(parseInt(pager.currentPage )+ 1)}>Next</a>
                </li>
                <li className={pager.currentPage == pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
            </ul>
          </div>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
