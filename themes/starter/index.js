import { Style } from './style'
import NotionPage from '@/components/NotionPage'
import { Hero } from './components/Hero'

// 1. 定义首页布局 (Login Page)
const LayoutIndex = (props) => {
  return (
    <div id='theme-starter' className='min-h-screen bg-black antialiased'>
      <Style />
      <Hero {...props} />
    </div>
  )
}

// 2. 定义会员数据页布局 (Member Dashboard)
const LayoutSlug = (props) => {
  const { post } = props
  if (!post) return null

  return (
    <div id='theme-starter' className='min-h-screen bg-[#050505] text-[#e5e5e5] antialiased'>
      <Style />
      <main className="pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 顶部会员身份卡片 */}
          <div className="mb-6 p-8 rounded-3xl bg-[#0d0d0d] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-900/10 blur-[80px] rounded-full"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-red-500 font-bold text-[10px] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                    Verified Member Space
                </div>
                <h1 className="text-3xl font-extrabold text-white">{post?.title}</h1>
            </div>
          </div>

          {/* 会员内容卡片 */}
          <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 md:p-10">
               <article className="prose prose-invert max-w-none">
                 <NotionPage post={post} />
               </article>
            </div>
          </div>

          <p className="mt-8 text-center text-[9px] tracking-[0.4em] text-white/20 uppercase font-bold">Secure Dashboard</p>
        </div>
      </main>
    </div>
  )
}

// 3. 为所有其他不使用的页面定义“安全占位符”，防止 Error #130
const LayoutSearch = (props) => <LayoutIndex {...props} />
const LayoutArchive = (props) => <LayoutIndex {...props} />
const Layout404 = (props) => <LayoutIndex {...props} />
const LayoutCategoryIndex = (props) => <LayoutIndex {...props} />
const LayoutTagIndex = (props) => <LayoutIndex {...props} />

// 统一导出
export {
  LayoutIndex,
  LayoutSlug,
  LayoutSearch,
  LayoutArchive,
  Layout404,
  LayoutCategoryIndex,
  LayoutTagIndex
}
