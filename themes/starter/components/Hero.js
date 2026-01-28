/* eslint-disable @next/next/no-img-element */
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import dynamic from 'next/dynamic'
import { useRef } from 'react'

const LoginModal = dynamic(() => import('@/themes/starter/components/LoginModal'), { ssr: false })

export const Hero = (props) => {
  const loginModalRef = useRef(null)

  return <>
    <div id="home" className="relative h-screen bg-black pt-[120px] flex items-center justify-center">
      <div className="container">
        <div className="-mx-4 flex flex-col items-center">
          <div className="w-full px-4 text-center">
            <div className="hero-content mx-auto max-w-[780px]">
              {/* 主标题 */}
              <h1 className="mb-6 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
                <span>PRO+</span><span className='text-red-600 ml-3 font-black'>一站式</span>
              </h1>
              
              {/* 次标题 */}
              <p className="mx-auto mb-10 max-w-[600px] text-lg font-light text-gray-400 leading-relaxed">
                Your one-stop favorites will never be lost!<br />
                你的一站式收藏夹 资源永不丢失！
              </p>

              {/* 按钮组 */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                  <button 
                    onClick={() => loginModalRef.current?.openSearch()}
                    className="inline-flex items-center justify-center rounded-full bg-white px-10 py-3.5 text-center text-sm font-semibold text-black hover:bg-gray-200 transition-all duration-300 transform active:scale-95 shadow-lg shadow-white/5"
                  >
                    会员登录
                  </button>
                
                  <a
                    href="https://pro-plus.top"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#1a1a1a] border border-gray-800 px-10 py-3.5 text-sm font-semibold text-white hover:bg-[#222] hover:border-gray-700 transition-all duration-300 transform active:scale-95"
                  >
                    关于 PRO+
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* 登录弹窗组件 */}
    <LoginModal cRef={loginModalRef} {...props} />
  </>
}
