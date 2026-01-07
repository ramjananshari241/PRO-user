import BLOG from '@/blog.config'
import { getGlobalData } from '@/lib/db/getSiteData'
import dynamic from 'next/dynamic'

// 关键：显式指定导入 starter 主题的首页组件，防止静态导出时 React 找不到组件类型
const ThemeComponents = dynamic(() => import('@/themes/starter').then(m => m.LayoutIndex || m.default), { ssr: true })

/**
 * 首页
 */
const Index = (props) => {
  return <ThemeComponents {...props} />
}

/**
 * 静态内容抓取
 */
export async function getStaticProps() {
  const from = 'archive' // 强制拉取全量数据（避开首页优化）
  const props = await getGlobalData({ from })

  // 确保数据源被正确解构
  const allPages = props?.allPages || props?.posts || []

  return {
    props: {
      ...props,
      allPages: allPages
    }
    // 注意：这里绝不能写 revalidate，否则 Cloudflare Pages 会部署失败
  }
}

export default Index
