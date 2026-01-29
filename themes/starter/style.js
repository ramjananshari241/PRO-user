/* eslint-disable react/no-unknown-property */
const Style = () => {
  return <style jsx global>{`
    /* 彻底消除顶部灰点残留 */
    .navbar-collapse ul li:nth-child(2) { display: none !important; }
    
    /* 会员后台 Notion 内容深度优化 */
    .notion {
        color: #efefef !important; /* 提高文字亮度，确保清晰 */
    }
    
    /* Notion 表格美化 */
    .notion-table {
        background: #121212 !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        border-radius: 16px !important;
        overflow: hidden !important;
    }
    .notion-table-cell {
        border: 1px solid rgba(255,255,255,0.05) !important;
        padding: 14px !important;
        font-size: 14px !important;
    }
    
    /* 针对标题美化 */
    .notion-h1, .notion-h2, .notion-h3 {
        color: #ffffff !important;
        border-bottom: 1px solid rgba(255,255,255,0.1) !important;
        padding-bottom: 10px !important;
        font-weight: 800 !important;
    }

    /* 首页禁止滚动时强制背景色 */
    body {
        background-color: #000 !important;
        -webkit-font-smoothing: antialiased;
    }

    /* 强行抹除所有统计乱码容器 */
    #busuanzi_container_site_pv, footer, .py-10.bg-dark {
        display: none !important;
        opacity: 0 !important;
        height: 0 !important;
    }
  `}</style>
}
export { Style }
