import { useGlobal } from '@/lib/global'
import { Style } from './style'
import NotionPage from '@/components/NotionPage'
import { Hero } from './components/Hero'

/**
 * 首页布局 - 仅保留 Hero
 */
const LayoutIndex = (props) => {
  return (
    <div id='theme-starter' className='min-h-screen bg-black antialiased'>
      <Style />
      {/* 彻底移除 CommonHead 和 Nav，防止报错 */}
      <Hero {...props} />
    </div>
  )
}

/**
 * 会员个人数据页布局 - 专业化后台重构
 */
const LayoutSlug = (props) => {
  const { post } = props
  return (
    <div id='theme-starter' className='min-h-screen bg-[#050505] text-[#e5e5e5] antialiased'>
      <Style />
      
      <main className="pt-12 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* 顶部标题卡片 */}
          <div className="mb-6 p-8 rounded-3xl bg-[#0d0d0d] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-900/20 blur-[80px] rounded-full"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3 text-red-500 font-bold text-[10px] tracking-widest uppercase">
                    <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    VIP Member Workspace
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    {post?.title}
                </h1>
            </div>
          </div>

          {/* 内容展示大卡片 */}
          <div className="bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 md:p-10">
               <article className="prose prose-invert max-w-none">
                 <NotionPage post={post} />
               </article>
            </div>
          </div>

          <div className="mt-10 text-center opacity-10">
            <p className="text-[9px] tracking-[0.5em] uppercase font-bold text-white text-center">PRO+ SECURE WORKSPACE</p>
          </div>
        </div>
      </main>
    </div>
  )
}

// 其他占位布局
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
