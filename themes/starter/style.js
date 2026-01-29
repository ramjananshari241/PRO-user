/* eslint-disable react/no-unknown-property */

/**
 * Starter主题专用全局样式 - 强力清理版
 */
const Style = () => {
  return <style jsx global>{`

  /* 1. 彻底干掉顶部的灰色圆点/残留阴影 */
  /* 针对导航栏中所有可能存在的空标签、残留按钮背景、或者特定链接进行物理隐藏 */
  .navbar-collapse ul li a:empty,
  .navbar-collapse ul li:nth-child(2),
  #theme-starter nav .container div > a:nth-child(2),
  .navbar-collapse ul li a[href=""],
  .navbar-collapse ul li a[href="#"] {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      opacity: 0 !important;
  }

  /* 2. 彻底干掉底部的 000000 乱码区域 */
  /* 屏蔽所有已知的统计插件容器和页脚残留 */
  #busuanzi_container_site_pv,
  #busuanzi_container_site_uv,
  #busuanzi_value_site_pv,
  #busuanzi_value_site_uv,
  .busuanzi_container_site_pv,
  #notion-next-statistics,
  footer,
  .footer,
  #footer,
  .py-10.bg-dark { /* 这是Starter主题常见的页脚阴影区域 */
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      height: 0 !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: hidden !important;
      pointer-events: none !important;
  }

  /* 3. 基础样式保留 */
  #theme-starter .sticky {
    position: fixed;
    z-index: 20;
    background-color: rgb(0 0 0 / 0.8);
    backdrop-filter: blur(8px);
    transition: all 0.3s;
  }

  :is(.dark #theme-starter .sticky) {
    background-color: rgb(0 0 0 / 0.8);
  }

  /* 按钮聚焦效果 */
  .vercel-input:focus {
      border-color: rgba(255,255,255,0.4) !important;
      background: rgba(255,255,255,0.05) !important;
  }

  `}</style>
}

export { Style }
