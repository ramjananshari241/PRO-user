import BLOG from '@/blog.config'
import { getGlobalData } from '@/lib/db/getSiteData' // 修正后的路径
import { useGlobal } from '@/lib/global'
import { THEME } from '@/blog.config'
import dynamic from 'next/dynamic'

/**
 * 首页 - 强制注入会员数据
 */
const Index = (props) => {
  const { theme } = useGlobal()
  
  // 调试日志：如果数字 > 0，登录就通了
  console.log('--- 首页载入检查 ---')
  console.log('已获取到总页面数:', props?.allPages?.length || 0)

  const ThemeComponents = dynamic(() => import(`@/themes/${theme}`), { ssr: true })
  return <ThemeComponents {...props} />
}

/**
 * 静态内容抓取
 */
export async function getStaticProps() {
  const from = 'archive' // 强制绕过首页优化，抓取全量数据
  const props = await getGlobalData({ from })

  // 确保数据源被正确解构并传递给 props
  return {
    props: {
      ...props,
      allPages: props.allPages || props.posts || []
    }
    // 注意：已移除 revalidate 参数，以适配 Cloudflare Pages 静态导出
  }
}

export default Index
