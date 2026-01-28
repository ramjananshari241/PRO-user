/* eslint-disable react/no-unknown-property */
const Style = () => {
  return <style jsx global>{`
  
  /** 彻底强行隐藏底部乱码 **/
  #busuanzi_container_site_pv,
  #busuanzi_container_site_uv,
  .busuanzi_container_site_pv,
  footer, footer *, .footer {
      display: none !important;
      height: 0 !important;
      opacity: 0 !important;
  }

  /** 输入框自动填充背景色修正（防止出现黄底白字） **/
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus {
    -webkit-text-fill-color: white !important;
    -webkit-box-shadow: 0 0 0px 1000px #1a1a1a inset !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  /** 让页面滚动更加平滑 **/
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: black;
    color: white;
    -webkit-font-smoothing: antialiased;
  }
  `}</style>
}
export { Style }
