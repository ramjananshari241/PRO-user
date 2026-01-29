/* eslint-disable react/no-unknown-property */
const Style = () => {
  return <style jsx global>{`
    /* 1. 彻底抹除导航残留 */
    .navbar-collapse ul li:nth-child(2) { display: none !important; }
    
    /* 2. 优化 Notion 表格在手机端的显示，防止撑破布局 */
    .notion-table-content {
      overflow-x: auto !important;
    }
    
    /* 3. 提升文字清晰度 */
    body {
      background-color: #000 !important;
      -webkit-font-smoothing: antialiased;
    }

    /* 4. 这里的样式专门针对子页面的卡片感 */
    .notion-page {
      padding: 0 !important;
      width: 100% !important;
    }

    /* 5. 再次强行隐藏可能存在的乱码 */
    #busuanzi_container_site_pv, footer, .py-10.bg-dark {
      display: none !important;
      height: 0;
      opacity: 0;
    }
  `}</style>
}
export { Style }
