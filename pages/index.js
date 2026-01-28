import BLOG from '@/blog.config'
import { getGlobalData } from '@/lib/db/getSiteData'
import dynamic from 'next/dynamic'

// 锁定主题为 starter
const ThemeComponents = dynamic(() => import('@/themes/starter').then(m => m.LayoutIndex || m.default), { ssr: true })

const Index = (props) => {
  return <ThemeComponents {...props} />
}

export async function getStaticProps() {
  const from = 'archive' 
  const props = await getGlobalData({ from })
  const allPages = props?.allPages || props?.posts || []

  return {
    props: {
      ...props,
      allPages: allPages
    },
    // 【关键】恢复实时抓取：每隔 5 秒检测一次 Notion 更新
    revalidate: BLOG.NEXT_REVALIDATE_SECOND || 5 
  }
}

export default Index
