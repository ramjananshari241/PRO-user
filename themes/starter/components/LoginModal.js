import { useState, useImperativeHandle } from 'react'
import { useRouter } from 'next/router'

/**
 * PRO+ 正式版登录弹窗
 */
const LoginModal = (props) => {
  const { cRef, allPages, posts } = props // 从首页 props 获取注入的数据
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
      console.log('登录弹窗已打开，可用数据源:', (allPages || posts || []).length, '条')
    }
  }))

  const handleLogin = (e) => {
    e?.preventDefault()
    setError('')
    setLoading(true)

    // 获取数据列表
    const pageList = allPages || posts || []
    
    if (pageList.length === 0) {
      setError('系统数据尚未加载完成，请刷新页面')
      setLoading(false)
      return
    }

    const inputSlug = String(username).trim()
    const inputPwd = String(password).trim()

    // 执行明文匹配（目前为了方便你测试，建议先用明文）
    const matchedUser = pageList.find(p => {
      const dbSlug = String(p.slug || '').trim()
      const dbPwd = String(p.password || '').trim()
      return dbSlug === inputSlug && dbPwd === inputPwd
    })

    if (matchedUser) {
      setIsOpen(false)
      router.push(`/${matchedUser.slug}`)
    } else {
      setLoading(false)
      setError('账号或密码不正确')
      // 调试：如果账号明明对了却报错，打印一下看看原因
      console.log('登录失败，当前尝试账号:', inputSlug)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-[#121212] border border-white/10 rounded-2xl shadow-2xl p-8">
        <div className="absolute top-0 left-0 h-1 w-full bg-red-700"></div>
        <h3 className="text-2xl font-bold text-white text-center mb-6">会员登录</h3>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="请输入账号"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-red-700 transition-all"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="请输入密码"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-red-700 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-white text-black font-bold rounded-xl active:scale-95">
            {loading ? '验证中...' : '确认进入'}
          </button>
        </form>
        <button onClick={() => setIsOpen(false)} className="w-full mt-6 text-gray-600 text-xs hover:text-gray-400">取消返回</button>
      </div>
    </div>
  )
}

export default LoginModal
