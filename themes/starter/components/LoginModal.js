import { useState, useImperativeHandle, useEffect } from 'react'

/**
 * PRO+ Vercel-Style 现代登录弹窗
 */
const LoginModal = (props) => {
  const { cRef, allPages, posts } = props
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false) // 控制动画状态

  // 弹出逻辑：先渲染组件，再延时触发动画
  useImperativeHandle(cRef, () => ({
    openSearch: () => {
      setIsOpen(true)
      setTimeout(() => setShowModal(true), 10)
      setError('')
    }
  }))

  const closeMe = () => {
    setShowModal(false)
    setTimeout(() => setIsOpen(false), 300) // 等动画结束再销毁
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const pageList = allPages || posts || []
    const inputSlug = username.trim()
    const inputPwd = password.trim()

    const matchedUser = pageList.find(p => {
      const dbSlug = String(p.slug || '').trim()
      const dbPwd = String(p.member_pwd || '').trim()
      return dbSlug === inputSlug && dbPwd === inputPwd
    })

    if (matchedUser) {
      window.location.href = `/${matchedUser.slug}`
    } else {
      setLoading(false)
      setError('账号或密码不匹配，请检查输入')
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl transition-opacity duration-300 ${showModal ? 'opacity-100' : 'opacity-0'}`}
      onClick={closeMe}
    >
      <div 
        className={`relative w-full max-w-[400px] bg-[#000] border border-[#333] rounded-[20px] p-10 shadow-[0_0_100px_-20px_rgba(255,255,255,0.1)] transition-all duration-300 ease-out ${showModal ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 标题 */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-white tracking-tighter">会员登录</h3>
          <p className="text-gray-500 text-sm mt-1">进入 PRO+ 一站式收藏空间</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 ml-1">账号</label>
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm outline-none focus:border-white transition-all duration-200 placeholder:text-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 ml-1">密码</label>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm outline-none focus:border-white transition-all duration-200 placeholder:text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-[#ff4d4d] text-xs text-center font-medium animate-pulse">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 mt-2"
          >
            {loading ? '正在验证...' : '确认进入'}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-3 text-[12px]">
            {/* 忘记密码链接 */}
            <a 
              href="https://pro-plus.top/contact" 
              target="_blank" 
              className="text-gray-500 hover:text-white transition-colors duration-200"
            >
              忘记密码？
            </a>

            <button 
              onClick={closeMe}
              className="text-gray-600 hover:text-gray-400 transition-colors"
            >
              返回首页
            </button>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
