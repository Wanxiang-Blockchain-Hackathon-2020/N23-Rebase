import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Helmet } from 'react-helmet'

export default class extends BaseComponent {
  ord_render() {
    const { desc, title, url } = this.props

    let host = 'https://noscov.rebase.network'
    switch (process.env.NODE_ENV) {
      case 'development':
        host = 'http://localhost:3001'
        break
      case 'staging':
        host = 'https://noscov.rebase.network'
        break
      default:
        break
    }

    const slogan =
      'NOS DAO - 利用存款利息奖励为疫情做出贡献的开源开发者'

    const description = desc || slogan

    const meta = [
      {
        name: 'description',
        content: description
      },
      {
        property: 'og:title',
        content: title || 'NOS DAO'
      },
      {
        property: 'og:description',
        content: description
      },
      // {
      //   property: 'og:image',
      //   content: 'https://www.weekly.org/assets/images/cr_landing.png'
      // },
      { property: 'og:url', content: url ? `${host}${url}` : host },
      // { property: 'og:site_name', content: 'Weekly' },
      // { property: 'twitter:image:alt', content: 'Weekly Logo' },
      { name: 'twitter:card', content: description }
    ]

    return <Helmet title={title} meta={meta} />
  }
}
