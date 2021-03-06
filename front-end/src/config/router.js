import LoginPage from '@/module/page/login/Container'
import RegisterPage from '@/module/page/register/Container'
import ForgotPasswordPage from '@/module/page/forgot_password/Container'
import ResetPasswordPage from '@/module/page/reset_password/Container'

import ProfileInfoPage from '@/module/page/profile/info/Container'

// post
import PostListPage from '@/module/page/post/list/Container'
import PostCreatePage from '@/module/page/post/create/Container'
import PostEditPage from '@/module/page/post/edit/Container'
import PostDetailPage from '@/module/page/post/detail/Container'

// deposit
import DepositListPage from '@/module/page/deposit/list/Container'
import DepositCreatePage from '@/module/page/deposit/create/Container'
import DepositEditPage from '@/module/page/deposit/edit/Container'
import DepositDetailPage from '@/module/page/deposit/detail/Container'

import NotFound from '@/module/page/error/NotFound'

export default [
  {
    path: '/',
    page: PostListPage,
  },
  {
    path: '/home',
    page: PostListPage,
  },
  /*
    ********************************************************************************
    * Login/Register
    ********************************************************************************
      */
  {
    path: '/login',
    page: LoginPage,
  },
  {
    path: '/register',
    page: RegisterPage,
  },
  {
    path: '/forgot-password',
    page: ForgotPasswordPage,
  },
  {
    path: '/reset-password',
    page: ResetPasswordPage,
  },
  /*
     ********************************************************************************
     * Post page
     ********************************************************************************
     */
  {
    path: '/posts',
    page: PostListPage,
  },
  {
    path: '/posts/create',
    page: PostCreatePage,
  },
  {
    path: '/posts/:id/edit',
    page: PostEditPage,
  },
  {
    path: '/posts/:id',
    page: PostDetailPage,
  },
  /*
     ********************************************************************************
     * Deposit page
     ********************************************************************************
     */
  {
    path: '/deposits',
    page: DepositListPage,
  },
  {
    path: '/deposits/create',
    page: DepositCreatePage,
  },
  {
    path: '/deposits/:id/edit',
    page: DepositEditPage,
  },
  {
    path: '/deposits/:id',
    page: DepositDetailPage,
  },
  /*
    ********************************************************************************
    * Profile page
    ********************************************************************************
      */
  {
    path: '/profile',
    page: ProfileInfoPage,
  },

  // Other
  {
    page: NotFound,
  },
]
