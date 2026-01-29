import BLOG from '@/blog.config'
import { getGlobalData } from '@/lib/db/getSiteData'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const ThemeComponents = dynamic(() => import('@/themes/starter').then(m => m.LayoutIndex || m.default), { ssr: true })

const Index = (props) => {
  // 首页专属：禁止滚动，防止滑到底部看到乱码
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return <ThemeComponents {...props} />
}

export async function getStaticProps() {
  const from = 'archive' 
  const props = await getGlobalData({ from })
  return {
    props: {
      ...props,
      allPages: props?.allPages || props?.posts || []
    }
  }
}

export default Index
