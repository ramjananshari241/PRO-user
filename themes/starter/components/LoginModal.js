import { useState, useImperativeHandle } from 'react'
import { useRouter } from 'next/router'

/**
 * PRO+ 增强调试版登录弹窗
 */
const LoginModal = (props) => {
  const { cRef } = props
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // 暴露给 Hero.js 的打开方法
  useImperativeHandle(cRef, () => ({
    openSearch: () => {
      setIsOpen(true)
      setError('')
      // 每次打开时，打印一下接收到的 props，看看数据到底在哪
      console.log('--- 弹窗 Props 检查 ---', props)
    }
  }))

  const handleLogin = (e) => {
    e?.preventDefault()
    setError('')
    setLoading(true)

    const inputSlug = String(username).trim()
    const inputPwd = String(password).trim()

    // --- 核心修复：多渠道获取数据源 ---
    // 有些版本叫 allPages，有些叫 posts
    const pageList = props.allPages || props.posts || []
    
    console.log('--- 登录尝试 ---')
    console.log('用户输入账号:', inputSlug)
    console.log('数据源判定:', props.allPages ? '使用 allPages' : (props.posts ? '使用 posts' : '无有效数据源'))
    console.log('当前可用页面总数:', pageList.length)

    if (pageList.length === 0) {
      console.error('错误：前端未检测到任何页面数据。请检查 pages/index.js 是否传递了 allPages')
      setError('系统数据加载中，请稍后重试或联系管理员')
      setLoading(false)
      return
    }

    // 执行匹配
    const matchedUser = pageList.find(p => {
      const dbSlug = String(p.slug || '').trim()
      const dbPwd = String(p.password || '').trim()
      
      // 辅助调试：如果账号对上了，打印一下密码对比情况
      if (dbSlug === inputSlug) {
          console.log('账号匹配成功，正在校验密码...')
          console.log('数据库内密码:', dbPwd)
          console.log('你输入的密码:', inputPwd)
      }

      return dbSlug === inputSlug && dbPwd === inputPwd
    })

    if (matchedUser) {
      console.log('登录成功，准备跳转...')
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
        {/* 顶部装饰条 */}
        <div className="absolute top-0 left-0 h-1 w-full bg-red-700"></div>
        
        <h3 className="text-2xl font-bold text-white text-center mb-6">会员登录</h3>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="请输入账号"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-red-700 transition-all placeholder:text-gray-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="请输入密码"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-red-700 transition-all placeholder:text-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-500 text-xs text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-red-700 hover:text-white transition-all transform active:scale-95"
          >
            {loading ? '安全验证中...' : '进入一站式空间'}
          </button>
        </form>

        <button 
          onClick={() => setIsOpen(false)}
          className="w-full mt-6 text-gray-500 text-xs hover:text-gray-300 transition-colors"
        >
          取消返回
        </button>
      </div>
    </div>
  )
}

export default LoginModal
