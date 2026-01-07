/* eslint-disable @next/next/no-img-element */
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useRef } from 'react'

const LoginModal = dynamic(() => import('@/themes/starter/components/LoginModal'), { ssr: false })
const RegAlgoliaSearchModal = dynamic(() => import('@/themes/starter/components/RegAlgoliaSearchModal'), { ssr: false })

export const Hero = (props) => {
  const loginModalRef = useRef(null)
  const regSearchModal = useRef(null)
  const router = useRouter()

  return <>
    <div id="home" className="relative h-screen bg-black pt-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-col items-center">
          <div className="w-full px-4 text-center">
            <div className="hero-content wow fadeInUp mx-auto max-w-[780px]" data-wow-delay=".2s">
              <h1 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                <span>PRO+</span><span className='text-red-700 ml-2'>一站式</span>
              </h1>
              <p className="mx-auto mb-9 max-w-[600px] text-base font-medium text-white/70">
                Your one-stop favorites will never be lost!<br />
                {siteConfig('STARTER_HERO_TITLE_2', null, CONFIG)}
              </p>

              <ul className="mb-10 flex flex-wrap items-center justify-center gap-5">
                <li>
                  <button 
                    onClick={() => loginModalRef.current?.openSearch()}
                    className="inline-flex items-center justify-center rounded-md bg-white px-20 py-[14px] text-center text-base font-medium text-dark hover:bg-red-700 hover:text-white transition-all"
                  >
                    会员登录
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => regSearchModal.current?.openSearch()}
                    className="flex items-center rounded-md bg-white/[0.12] px-16 py-[14px] text-base font-medium text-white hover:bg-white hover:text-dark transition-all"
                  >
                    注册说明
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <LoginModal cRef={loginModalRef} {...props} />
    <RegAlgoliaSearchModal cRef={regSearchModal} {...props} />
  </>
}
