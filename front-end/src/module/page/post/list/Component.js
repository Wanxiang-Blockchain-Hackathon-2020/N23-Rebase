import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import styled from 'styled-components'
import { Pagination, Button, Col, Row, Spin } from 'antd'
import I18N from '@/I18N'
import { POST_STATUS } from '@/constant'
import { logger } from '@/util'
import StandardPage from '@/module/page/StandardPage'
import { breakPoint } from '@/constants/breakPoint'
import moment from 'moment/moment'

// import {} from './style'

const SORT_BY = {
  createdAt: 'createdAt',
  likesNum: 'likesNum',
  viewsNum: 'viewsNum'
}
const DEFAULT_SORT = SORT_BY.createdAt

export default class extends StandardPage {
  constructor(props) {
    super(props)

    // we use the props from the redux store if its retained
    this.state = {
      results: 10,
      total: 0,
      search: '',
      filter: ''
    }
    // this.debouncedRefetch = _.debounce(this.refetch.bind(this), 300)
  }

  componentDidMount() {
    super.componentDidMount()
    this.refetch()
  }

  componentWillUnmount() {
    this.props.resetAll()
  }


  ord_renderContent() {
    const headerNode = this.renderHeader()
    const listNode = this.renderList()

    return (
      <div>
        <div className="post-header">
          {headerNode}
        </div>
        <PostContainer className="p_PostList">
          <Row gutter={24} style={{marginTop: 32}}>
            <Col span={24}>
              {listNode}
            </Col>
          </Row>
        </PostContainer>
      </div>
    )
  }

  renderHeader() {
    return (
      <div>
        <PostContainer>
          <h2>所有提案</h2>
        </PostContainer>
      </div>
    )
  }

  renderList() {
    const {dataList, loading} = this.props
    const loadingNode = <div className="center"><Spin size="large"/></div>
    const paginationNode = this.renderPagination()
    let result = loadingNode
    if (!loading) {
      if (_.isEmpty(dataList)) {
        result = <NoData>{I18N.get('post.nodata')}</NoData>
      } else {
        result = _.map(dataList, data => this.renderItem(data))
      }
    }

    return (
      <div>
        <div className="list-container">
          {result}
        </div>
        {paginationNode}
      </div>
    )
  }

  renderItem = (data) => {
    const href = `/posts/${data._id}`
    // const metaNode = this.renderMetaNode(data)
    const title = <ItemTitle to={href}>{data.title}</ItemTitle>
    // const tagsNode = this.renderTagsNode(data)
    return (
      <ItemContainer key={data._id}>
        {/* {metaNode} */}
        {title}
        {moment(data.createdAt).format('MMM D, YYYY')}
        <span> by </span>
        {data.createdBy._id}
        <div>金额：{data.amount || 1}</div>
        <div>捐给：{data.to}</div>
        <hr />
        {/* {tagsNode} */}
        {/* <ShortDesc>
          <MarkdownPreview content={data.desc} />
        </ShortDesc> */}
      </ItemContainer>
    )
  }

  onPageChanged = (page) => {
    const { changePage } = this.props
    changePage(page)
    this.loadPage(page)
  }

  renderPagination() {
    const { total, page } = this.props
    const { results } = this.state
    const props = {
      pageSize: results,
      total,
      current: page,
      onChange: this.onPageChanged,
    }
    return <Pagination {...props} className="cr-pagination" />
  }

  /**
   * Builds the query from the current state
   */
  getQuery = () => {
    const sortBy = this.props.sortBy || DEFAULT_SORT
    const { page } = this.props
    const { results, search, filter } = this.state
    const query = {
      status: POST_STATUS.PUBLISHED,
      page,
      results
    }

    // TODO
    if (sortBy) {
      query.sortBy = sortBy
    }

    if (search) {
      query.search = search
    }

    if (filter) {
      query.filter = filter
    }
    return query
  }

  /**
   * Refetch the data based on the current state retrieved from getQuery
   */
  refetch = () => {
    const query = this.getQuery()
    this.props.getList(query)
  }

  loadPage = async (page) => {
    const query = {
      ...this.getQuery(),
      page,
      results: this.state.results,
    }

    this.setState({ loadingMore: true })

    try {
      await this.props.loadMore(query)
    } catch (e) {
      // Do not update page in state if the call fails
      logger.error(e)
    }

    this.setState({ loadingMore: false })
  }

  gotoDetail(id) {
    this.props.history.push(`/posts/${id}`)
  }
}

const ItemContainer = styled.div`
  margin-bottom: 22px;
`

const ItemTitle = styled(Link)`
  font-size: 20px;
  color: black;
  transition: all 0.3s;
  font-weight: 400;
  text-decoration: none;
  margin: 8px 0;
  display: block;
  &:hover {
    color: $link_color;
  }
`

const PostContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  @media only screen and (max-width: ${breakPoint.xl}) {
    /* margin: 0 5%; */
  }
`

const NoData = styled.div`
  text-align: center;
  padding: 25px 0;
`
