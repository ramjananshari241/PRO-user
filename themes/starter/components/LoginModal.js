import { useState, useImperativeHandle, useEffect } from 'react'

const LoginModal = (props) => {
  const { cRef, allPages, posts } = props
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useImperativeHandle(cRef, () => ({
    openSearch: () => {
      setIsOpen(true)
      setError('')
      console.log('LoginModal Ready. Data count:', (allPages || posts || []).length)
    }
  }))

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const pageList = allPages || posts || []
    const inputSlug = username.trim()
    const inputPwd = password.trim()

    console.log('Validating login for:', inputSlug)

    const matchedUser = pageList.find(p => {
      const dbSlug = String(p.slug || '').trim()
      const dbPwd = String(p.member_pwd || '').trim() // 匹配我们在后端存入的隐藏密码
      
      if (dbSlug === inputSlug) {
          console.log('User found! Comparing passwords...')
          return dbPwd === inputPwd
      }
      return false
    })

    if (matchedUser) {
      console.log('Login Success!')
      window.location.href = `/${matchedUser.slug}`
    } else {
      setLoading(false)
      setError('账号或密码不正确')
      console.warn('Login failed.')
    }
  }

  if (!mounted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl p-8 overflow-hidden">
        <div className="absolute top-0 left-0 h-1 w-full bg-red-700"></div>
        <h3 className="text-2xl font-bold text-white text-center mb-8 tracking-widest">会员登录</h3>
        <form onSubmit={handleLogin} className="space-y-6">
          <input type="text" placeholder="账号" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-red-700" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="密码" required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-red-700" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-4 bg-white text-black font-extrabold rounded-xl active:scale-95 transition-all">确认进入</button>
        </form>
        <button onClick={() => setIsOpen(false)} className="w-full mt-6 text-gray-500 text-xs text-center">返回首页</button>
      </div>
    </div>
  )
}

export default LoginModal
