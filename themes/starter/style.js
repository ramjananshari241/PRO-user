/* eslint-disable react/no-unknown-property */
const Style = () => {
  return <style jsx global>{`
    /* 1. 彻底清除顶部导航栏及其所有残留元素（灰点） */
    nav, header, .navbar, .navbar-collapse, li, .navbar-toggler {
        display: none !important;
        height: 0 !important;
        width: 0 !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
    }

    /* 2. 内部会员页内容美化 */
    .notion {
        color: #ffffff !important;
        line-height: 1.6;
    }
    
    /* 表格极致黑风格 */
    .notion-table {
        background: #111 !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
        border-radius: 12px !important;
        overflow: hidden !important;
    }
    .notion-table-cell {
        border: 1px solid rgba(255,255,255,0.05) !important;
        padding: 12px !important;
    }
    
    /* 3. 强行抹除底部统计乱码区域 */
    #busuanzi_container_site_pv, footer, #footer, .py-10.bg-dark {
        display: none !important;
        height: 0 !important;
    }

    body {
        background-color: #000 !important;
        margin: 0;
        -webkit-font-smoothing: antialiased;
    }

    /* 针对你图片中提到的红色通知文本进行高亮处理 */
    span[style*="color:red"], span[style*="color: rgb(255, 0, 0)"] {
        background: rgba(255, 0, 0, 0.1) !important;
        color: #ff4d4d !important;
        padding: 1px 6px;
        border-radius: 4px;
        font-weight: 600;
    }
  `}</style>
}
export { Style }
