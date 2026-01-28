import { useState, useImperativeHandle, useEffect } from 'react'

const LoginModal = (props) => {
  const { cRef, allPages, posts } = props
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimate, setIsAnimate] = useState(false) // 用于触发动画
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // 动画延迟处理
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsAnimate(true), 10)
    } else {
      setIsAnimate(false)
    }
  }, [isOpen])

  useImperativeHandle(cRef, () => ({
    openSearch: () => {
      setIsOpen(true)
      setError('')
    }
  }))

  const handleClose = () => {
    setIsAnimate(false)
    setTimeout(() => setIsOpen(false), 300) // 等待动画结束
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const pageList = allPages || posts || []
    const matchedUser = pageList.find(p => {
      const dbSlug = String(p.slug || '').trim()
      const dbPwd = String(p.member_pwd || '').trim()
      return dbSlug === username.trim() && dbPwd === password.trim()
    })

    if (matchedUser) {
      window.location.href = `/${matchedUser.slug}`
    } else {
      setLoading(false)
      setError('账号或密码校验未通过')
    }
  }

  if (!mounted || !isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isAnimate ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-sm bg-[#0f0f0f] border border-white/5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-10 overflow-hidden transition-all duration-300 transform ${isAnimate ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部微光线条 */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        
        <div className="text-center mb-10">
          <h3 className="text-2xl font-semibold text-white tracking-tight">会员鉴权</h3>
          <p className="text-gray-500 text-xs mt-2 tracking-[0.1em] font-light">PRO+ INFOMATION SYSTEM</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="group">
            <input
              type="text"
              placeholder="账号"
              required
              className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white outline-none transition-all duration-300 group-hover:border-white/20 focus:border-red-700 focus:bg-white/[0.05] focus:ring-4 focus:ring-red-700/10 placeholder:text-gray-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="group">
            <input
              type="password"
              placeholder="密码"
              required
              className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white outline-none transition-all duration-300 group-hover:border-white/20 focus:border-red-700 focus:bg-white/[0.05] focus:ring-4 focus:ring-red-700/10 placeholder:text-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-500 text-xs text-center font-medium animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-white text-black font-bold rounded-2xl transition-all duration-300 hover:bg-red-700 hover:text-white active:scale-[0.98] shadow-lg shadow-white/5 disabled:opacity-50"
          >
            {loading ? '正在同步密钥...' : '确认登录'}
          </button>
        </form>

        <button 
          onClick={handleClose}
          className="w-full mt-8 text-gray-600 text-xs hover:text-gray-400 transition-colors"
        >
          返回
        </button>
      </div>
    </div>
  )
}

export default LoginModal
