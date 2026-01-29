import { useGlobal } from '@/lib/global'
import CommonHead from '@/components/CommonHead'
import { Nav } from './components/Nav'
import { Style } from './style'
import NotionPage from '@/components/NotionPage'
import { Hero } from './components/Hero'

// 首页布局保持原样
const LayoutIndex = (props) => {
  return (
    <div id='theme-starter' className='min-h-screen bg-black antialiased'>
      <Style />
      <CommonHead {...props} />
      <Nav {...props} />
      <Hero {...props} />
    </div>
  )
}

// 【核心优化】会员后台布局重构
const LayoutSlug = (props) => {
  const { post } = props
  return (
    <div id='theme-starter' className='min-h-screen bg-[#050505] text-[#e5e5e5] antialiased'>
      <CommonHead {...props} />
      <Style />
      <Nav {...props} />

      {/* 后台主容器 */}
      <main className="pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* 顶部标题卡片 */}
          <div className="mb-6 p-8 rounded-3xl bg-[#0d0d0d] border border-white/5 shadow-2xl relative overflow-hidden group">
             {/* 装饰光晕 */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-900/20 blur-[80px] rounded-full group-hover:bg-red-800/30 transition-all duration-700"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3 text-red-500 font-bold text-xs tracking-widest uppercase">
                    <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    VIP Member Workspace
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    {post?.title}
                </h1>
            </div>
          </div>

          {/* 内容展示卡片 - Vercel 风格 */}
          <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 md:p-10">
               {/* 页面内容渲染 */}
               <article className="prose prose-invert max-w-none">
                 <NotionPage post={post} />
               </article>
            </div>
          </div>

          {/* 底部版权 */}
          <div className="mt-10 text-center opacity-20 hover:opacity-100 transition-opacity">
            <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-white">PRO+ Private Space</p>
          </div>
        </div>
      </main>
    </div>
  )
}

// 搜索页布局
const LayoutSearch = (props) => <LayoutIndex {...props} />
const LayoutArchive = (props) => <LayoutIndex {...props} />
const Layout404 = (props) => <LayoutIndex {...props} />
const LayoutCategoryIndex = (props) => <LayoutIndex {...props} />
const LayoutTagIndex = (props) => <LayoutIndex {...props} />

export {
  LayoutIndex,
  LayoutSlug,
  LayoutSearch,
  LayoutArchive,
  Layout404,
  LayoutCategoryIndex,
  LayoutTagIndex
}
