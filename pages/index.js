import BLOG from '@/blog.config'
import { getGlobalData } from '@/lib/db/getSiteData'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const ThemeComponents = dynamic(() => import('@/themes/starter').then(m => m.LayoutIndex || m.default), { ssr: true })

const Index = (props) => {
  // --- 关键逻辑：仅在首页禁止滚动，解决底部乱码显示问题 ---
  useEffect(() => {
    // 禁止滚动
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    return () => {
      // 当离开首页（跳转到子页面）时，恢复滚动
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }, [])

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
    }
  }
}

export default Index
