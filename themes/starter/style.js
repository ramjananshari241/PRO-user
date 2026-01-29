/* eslint-disable react/no-unknown-property */
const Style = () => {
  return <style jsx global>{`
    /* 1. 彻底干掉顶部的灰色圆点/残留按钮阴影 */
    /* 针对导航栏中的所有 li 结构进行物理隐藏 */
    .navbar-collapse ul li, 
    .navbar-btn,
    #navbarCollapse ul li:nth-child(2) { 
        display: none !important; 
    }
    
    /* 2. 提升内部页面 Notion 内容的清晰度 */
    .notion {
        color: #ffffff !important; /* 强制纯白文字 */
    }
    
    /* 3. Notion 表格专业化美化 */
    .notion-table {
        background: #141414 !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
        border-radius: 12px !important;
        color: #fff !important;
    }
    .notion-table-cell {
        border: 1px solid rgba(255,255,255,0.05) !important;
        padding: 12px 15px !important;
    }
    
    /* 4. 针对图片中的红色“通知”文字进行美化处理 */
    span[style*="color:red"], span[style*="color: rgb(255, 0, 0)"] {
        background: rgba(255, 0, 0, 0.15) !important;
        color: #ff4d4d !important;
        padding: 2px 8px !important;
        border-radius: 6px !important;
        font-weight: bold !important;
        border: 1px solid rgba(255, 0, 0, 0.2);
    }

    /* 5. 再次强行隐藏底部乱码容器 */
    #busuanzi_container_site_pv, footer, .py-10.bg-dark {
        display: none !important;
        height: 0 !important;
        visibility: hidden !important;
    }

    body {
        background-color: #000 !important;
        -webkit-font-smoothing: antialiased;
    }
  `}</style>
}
export { Style }
