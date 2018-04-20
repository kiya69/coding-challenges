import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    initialPageSize: 9
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        let currPage = location.hash.split('/')[2] || props.currPage;
        let pageSize = props.pageSize || this.props.initialPageSize;
        this.state = { pager: {}, currPage: currPage, pageSize: pageSize};
    }

      componentWillMount() {
          // set page if items array isn't empty
          if (this.props.items && this.props.items.length) {
              this.setPage(this.state.currPage);
          }
      }
      componentWillReceiveProps(newProps){
        this.setState({currPage: newProps.currPage, pageSize: newProps.pageSize})
      }
      componentDidUpdate(prevProps) {
          // reset page if items array has changed
          if (this.props.items !== prevProps.items || this.props.pageSize !== prevProps.pageSize) {
              this.setPage(this.state.currPage);
          }
      }

    updatePage(){
      this.setPage(this.state.currPage);
    }
    componentDidMount() { // if screen size changed, update the pagination size (maxPage)
        window.addEventListener("resize", this.updatePage.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePage.bind(this));
    }
    setPage(page, e) {
        var items = this.props.items;
        var pager = this.state.pager;
        if (page < 1 || page > pager.totalPages || (e && e.target.parentElement.className.indexOf('disabled') > -1)) {
            return;
        }
        if(e){ //if the call is coming from user click
            window.scrollTo(0, 0);
        }

        hashHistory.replace('/page/'+page);
        this.setState({currPage: page})
        // get new pager object for specified page
        pager = this.getPager(items.length, page);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems, page);
    }

    getPager(totalItems, currentPage) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 9
        let pageSize = this.state.pageSize || 9;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage, maxPage;
        if(window.innerWidth >= 667){
          maxPage = 10;
        } else {
          maxPage = 3; // for mobile & small screens
        }
        if (totalPages <= maxPage) {
            // less than maxPage so show all
            startPage = 1;
            endPage = totalPages;
        } else { // to keep the currentPage in the middle, so you compare with maxPage/2
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
        return (
          <div className="text-center">
            <ul className={"pagination" + (window.innerWidth < 667 ? " pagination-sm" : "")}>
                <li className={pager.currentPage == 1 ? 'disabled' : ''}>
                    <a onClick={(e) => this.setPage(1, e)}>First</a>
                </li>
                <li className={pager.currentPage == 1 ? 'disabled' : ''}>
                    <a onClick={(e) => this.setPage(pager.currentPage - 1, e)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage == page ? 'active' : ''}>
                        <a onClick={(e) => this.setPage(page, e)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage == pager.totalPages ? 'disabled' : ''}>
                    <a onClick={(e) => this.setPage(parseInt(pager.currentPage )+ 1, e)}>Next</a>
                </li>
                <li className={pager.currentPage == pager.totalPages ? 'disabled' : ''}>
                    <a onClick={(e) => this.setPage(pager.totalPages, e)}>Last</a>
                </li>
            </ul>
          </div>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
