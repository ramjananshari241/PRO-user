import BLOG from '@/blog.config'
import { getGlobalData } from '@/lib/db/getSiteData'
import dynamic from 'next/dynamic'

// 锁定主题为 starter，减少动态加载带来的不确定性
const ThemeComponents = dynamic(() => import('@/themes/starter'), { ssr: true })

const Index = (props) => {
  return <ThemeComponents {...props} />
}

export async function getStaticProps() {
  const from = 'archive' // 强行拉取全库数据
  const props = await getGlobalData({ from })

  return {
    props: {
      ...props,
      allPages: props?.allPages || props?.posts || []
    }
  }
}

export default Index
