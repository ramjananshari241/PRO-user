import { useState, useImperativeHandle } from 'react'
import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global' // 引入全局钩子

/**
 * PRO+ 自主寻桩版登录弹窗
 */
const LoginModal = (props) => {
  const { cRef } = props
  const { allPages, posts } = useGlobal() // 关键：直接从全局状态里抓取全量页面
  
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useImperativeHandle(cRef, () => ({
    openSearch: () => {
      setIsOpen(true)
      setError('')
      // 调试：看看全局雷达搜到了什么
      console.log('--- 全局雷达扫描结果 ---')
      console.log('allPages 数量:', allPages?.length)
      console.log('posts 数量:', posts?.length)
    }
  }))

  const handleLogin = (e) => {
    e?.preventDefault()
    setError('')
    setLoading(true)

    const inputSlug = String(username).trim()
    const inputPwd = String(password).trim()

    // 自动判定有效的数据源：全站页面 或 文章列表
    const pageList = allPages || posts || []
    
    console.log('--- 登录尝试 ---')
    console.log('可用数据源总数:', pageList.length)

    if (pageList.length === 0) {
      setError('系统数据尚未就绪，请刷新页面或检查配置')
      setLoading(false)
      return
    }

    // 在全局数据中查找
    const matchedUser = pageList.find(p => {
      const dbSlug = String(p.slug || '').trim()
      const dbPwd = String(p.password || '').trim()
      
      // 这里的逻辑依然是明文对比，方便你现在排查
      if (dbSlug === inputSlug) {
          console.log('账号匹配，正在对比密码...')
          console.log('数据库密码:', dbPwd)
      }
      return dbSlug === inputSlug && dbPwd === inputPwd
    })

    if (matchedUser) {
      setIsOpen(false)
      router.push(`/${matchedUser.slug}`)
    } else {
      setLoading(false)
      setError('账号或密码不正确')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-[#121212] border border-white/10 rounded-2xl shadow-2xl p-8 overflow-hidden">
        <div className="absolute top-0 left-0 h-1 w-full bg-red-700"></div>
        <h3 className="text-2xl font-bold text-white text-center mb-6">会员登录</h3>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            placeholder="账号"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-red-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="密码"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-red-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-white text-black font-bold rounded-xl active:scale-95 transition-all">
            {loading ? '正在进入...' : '立即登录'}
          </button>
        </form>
        <button onClick={() => setIsOpen(false)} className="w-full mt-6 text-gray-500 text-xs">取消返回</button>
      </div>
    </div>
  )
}

export default LoginModal
