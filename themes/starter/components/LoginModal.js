import { useState, useImperativeHandle, useEffect } from 'react'
import md5 from 'js-md5'

/**
 * PRO+ 最终修复版登录弹窗
 */
const LoginModal = (props) => {
  const { cRef, allPages, posts } = props
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 确保组件仅在客户端渲染，防止 Hydration Error
  useEffect(() => {
    setMounted(true)
  }, [])

  useImperativeHandle(cRef, () => ({
    openSearch: () => {
      setIsOpen(true)
      setError('')
      console.log('--- 登录弹窗已开启 ---')
      console.log('当前 props 中的数据条数:', (allPages || posts || []).length)
    }
  }))

  const handleLogin = (e) => {
    e?.preventDefault()
    setError('')
    setLoading(true)

    // 数据源多重保障
    const pageList = allPages || posts || []
    const inputSlug = String(username).trim()
    const inputPwd = String(password).trim()

    // 重要：计算 MD5 暗号，逻辑必须与 getPageProperties.js 保持一致
    // 逻辑是：md5(账号slug + 密码明文)
    const hashedInput = md5(inputSlug + inputPwd)

    console.log('--- 正在尝试匹配 ---')
    console.log('账号总条数:', pageList.length)

    if (pageList.length === 0) {
      setError('数据尚未就绪，请刷新页面')
      setLoading(false)
      return
    }

    const matchedUser = pageList.find(p => {
      const dbSlug = String(p.slug || '').trim()
      const dbPwd = String(p.password || '').trim()
      
      // 调试日志
      if (dbSlug === inputSlug) {
          console.log('>>> 账号已找到:', dbSlug)
          console.log('>>> 数据库存储哈希:', dbPwd)
          console.log('>>> 本次输入计算哈希:', hashedInput)
      }
      return dbSlug === inputSlug && dbPwd === hashedInput
    })

    if (matchedUser) {
      console.log('登录成功，准备跳转')
      setIsOpen(false)
      window.location.href = `/${matchedUser.slug}`
    } else {
      setLoading(false)
      setError('账号或密码不正确')
      console.warn('登录失败：未找到账号或密码对不上')
    }
  }

  if (!mounted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-[#121212] border border-white/10 rounded-2xl shadow-2xl p-8 overflow-hidden">
        <div className="absolute top-0 left-0 h-1 w-full bg-red-700"></div>
        <h3 className="text-2xl font-bold text-white text-center mb-6 tracking-widest">会员登录</h3>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            placeholder="账号"
            required
            autoComplete="username"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-red-700 transition-all"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="密码"
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-red-700 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-red-700 hover:text-white transition-all transform active:scale-95">
            {loading ? '身份校验中...' : '确认进入'}
          </button>
        </form>
        <button onClick={() => setIsOpen(false)} className="w-full mt-6 text-gray-600 text-xs hover:text-white transition-colors text-center">
          取消并返回
        </button>
      </div>
    </div>
  )
}

export default LoginModal
