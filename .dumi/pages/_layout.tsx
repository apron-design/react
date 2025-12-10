import React from 'react';

const Layout: React.FC<any> = (props) => {
  const { children, location } = props;
  
  // 自定义侧边栏组件
  const Sidebar = () => (
    <aside className="custom-sidebar">
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="/" className={location.pathname === '/' ? 'active' : ''}>首页</a>
            </li>
            <li>
              <a href="/components" className={location.pathname.startsWith('/components') ? 'active' : ''}>组件</a>
              <ul className="sub-nav">
                <li><a href="/components/button">Button 按钮</a></li>
                {/* 可以根据需要添加更多组件链接 */}
              </ul>
            </li>
            <li>
              <a href="/demo" className={location.pathname === '/demo' ? 'active' : ''}>样式演示</a>
            </li>
            <li>
              <a href="https://github.com/apron-design/react" target="_blank" rel="noopener noreferrer">GitHub</a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );

  // 自定义头部组件
  const Header = () => (
    <header className="custom-header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <picture>
              <source srcSet="/images/logo-dark.svg" media="(prefers-color-scheme: dark)" />
              <img 
                src="/images/logo-light.svg" 
                alt="Apron Design Logo" 
                className="logo-img"
              />
            </picture>
            <span className="logo-text">Apron Design</span>
          </div>
        </div>
        <div className="header-right">
          <nav className="header-nav">
            <a href="/" className={location.pathname === '/' ? 'active' : ''}>首页</a>
            <a href="/components" className={location.pathname.startsWith('/components') ? 'active' : ''}>组——件</a>
            <a href="/demo" className={location.pathname === '/demo' ? 'active' : ''}>演示</a>
            <a href="https://github.com/apron-design/react" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>
      </div>
    </header>
  );

  // 自定义页脚组件
  const Footer = () => (
    <footer className="custom-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <picture>
              <source srcSet="/images/logo-dark.svg" media="(prefers-color-scheme: dark)" />
              <img 
                src="/images/logo-light.svg" 
                alt="Apron Design Logo" 
                className="footer-logo-img"
              />
            </picture>
            <span className="footer-logo-text">Apron Design 1</span>
          </div>
          <div className="footer-links">
            <a href="/">首页</a>
            <a href="/components">1111组件</a>
            <a href="/demo">演示</a>
            <a href="https://github.com/apron-design/react" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <div className="footer-copyright">
            <p>Copyright © 2025 Apron Design Team</p>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="custom-layout-wrapper">
      <Header />
      <div className="custom-layout-container">
        <Sidebar />
        <main className="custom-layout-main">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;