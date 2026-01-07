import { useState, useImperativeHandle, useEffect } from 'react'

const LoginModal = (props) => {
  const { cRef, allPages } = props
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
      console.log('弹窗开启，当前可用数据:', allPages)
    }
  }))

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const pageList = allPages || props.posts || []
    const inputSlug = username.trim()
    const inputPwd = password.trim()

    console.log('--- 开始匹配 ---')
    console.log('总库数量:', pageList.length)

    const matchedUser = pageList.find(p => {
      const dbSlug = String(p.slug || '').trim()
      const dbPwd = String(p.member_pwd || '').trim()
      
      if (dbSlug === inputSlug) {
        console.log('账号匹配，对比密码...', { 库存密码: dbPwd, 输入密码: inputPwd })
        return dbPwd === inputPwd
      }
      return false
    })

    if (matchedUser) {
      console.log('校验通过')
      window.location.href = `/${matchedUser.slug}`
    } else {
      setLoading(false)
      setError('账号或密码不正确')
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
          <button type="submit" disabled={loading} className="w-full py-4 bg-white text-black font-extrabold rounded-xl active:scale-95 transition-all">确认登录</button>
        </form>
        <button onClick={() => setIsOpen(false)} className="w-full mt-6 text-gray-500 text-xs text-center">返回首页</button>
      </div>
    </div>
  )
}

export default LoginModal
