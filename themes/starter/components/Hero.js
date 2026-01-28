/* eslint-disable @next/next/no-img-element */
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import dynamic from 'next/dynamic'
import { useRef } from 'react'

const LoginModal = dynamic(() => import('@/themes/starter/components/LoginModal'), { ssr: false })

export const Hero = (props) => {
  const loginModalRef = useRef(null)

  return <>
    <div id="home" className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* 背景微光装饰 - 提升高级感 */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gray-900/20 blur-[120px] rounded-full"></div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center">
            {/* 主标题 */}
            <h1 className="mb-6 text-4xl font-extrabold leading-snug text-white sm:text-5xl lg:text-6xl tracking-tight">
              <span>PRO+</span><span className='text-red-700 ml-3'>一站式</span>
            </h1>
            
            {/* 次标题 */}
            <p className="mx-auto mb-10 max-w-[600px] text-lg font-light text-gray-400 leading-relaxed">
               Your one-stop favorites will never be lost!<br />
               {siteConfig('STARTER_HERO_TITLE_2', null, CONFIG)}
            </p>

            {/* 单个登录按钮 + 忘记密码 */}
            <div className="flex flex-col items-center space-y-6">
                <button 
                  onClick={() => loginModalRef.current?.openSearch()}
                  className="group relative inline-flex items-center justify-center rounded-full bg-white px-12 py-4 text-base font-bold text-black transition-all duration-300 hover:bg-red-700 hover:text-white hover:shadow-[0_0_20px_rgba(185,28,28,0.4)] transform hover:-translate-y-0.5 active:scale-95"
                >
                  会员登录进入
                </button>
                
                <a 
                  href="https://fcssr.top/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-300 transition-colors border-b border-transparent hover:border-gray-700 pb-0.5 tracking-wide"
                >
                  忘记密码？
                </a>
            </div>
        </div>
      </div>
    </div>

    <LoginModal cRef={loginModalRef} {...props} />
  </>
}
