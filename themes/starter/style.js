/* eslint-disable react/no-unknown-property */
const Style = () => {
  return <style jsx global>{`
    /* 1. 彻底干掉顶部的灰色圆点和所有导航残留 */
    .navbar-collapse, .navbar-collapse ul, .navbar-btn, li, nav {
        display: none !important;
        height: 0 !important;
        opacity: 0 !important;
    }
    
    /* 2. 强制提升文字清晰度 */
    .notion, .notion-text, .notion-list, .notion-quote {
        color: #ffffff !important;
    }
    
    /* 3. Notion 表格极致黑风格 */
    .notion-table {
        background: #121212 !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
        border-radius: 16px !important;
        overflow: hidden !important;
    }
    .notion-table-cell {
        border: 1px solid rgba(255,255,255,0.06) !important;
        padding: 15px !important;
        color: #fff !important;
    }
    
    /* 4. 强行抹除底部乱码 */
    #busuanzi_container_site_pv, footer, .py-10.bg-dark, #footer {
        display: none !important;
        height: 0 !important;
        visibility: hidden !important;
    }

    body {
        background-color: #000 !important;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
    }

    /* 针对手机端表格自动横滑 */
    .notion-table-content {
      overflow-x: auto !important;
    }
  `}</style>
}
export { Style }
