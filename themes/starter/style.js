/* eslint-disable react/no-unknown-property */
const Style = () => {
  return <style jsx global>{`
    /* 彻底消除顶部第二个按钮留下的灰点/阴影 */
    a[href*="pro-plus.top"], 
    .navbar-collapse ul li:nth-child(2) {
        display: none !important;
    }

    /* 强行隐藏底部乱码数字 */
    #busuanzi_container_site_pv, #busuanzi_value_site_pv, footer {
        display: none !important;
    }

    /* Vercel 风格输入框聚焦特效 */
    .vercel-input:focus {
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.05) !important;
    }

    /* 登录按钮发光特效 */
    .login-btn-glow:hover {
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
    }

    /* 震动动画用于报错提示 */
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      75% { transform: translateX(4px); }
    }
    .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
  `}</style>
}
export { Style }
