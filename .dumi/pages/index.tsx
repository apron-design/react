import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Apron Design</h1>
            <p className="hero-subtitle">现代化 React UI 组件库，支持暗黑模式和主题定制</p>
            <div className="hero-actions">
              <a href="/components" className="btn btn-primary">开始使用</a>
              <a href="https://github.com/apron-design/react" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                GitHub
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="placeholder-image">
              <span>组件库预览图</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">核心特性</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">设计美观</h3>
              <p className="feature-description">采用现代化设计语言，界面简洁美观，提供一致的用户体验</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">性能卓越</h3>
              <p className="feature-description">优化的组件实现，支持 Tree Shaking，确保流畅的用户体验</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3 className="feature-title">易于使用</h3>
              <p className="feature-description">清晰的API设计，完整的TypeScript类型支持，降低学习和使用成本</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌙</div>
              <h3 className="feature-title">暗黑模式</h3>
              <p className="feature-description">内置暗黑模式支持，轻松切换主题，保护用户视力</p>
            </div>
          </div>
        </div>
      </section>

      {/* Components Preview */}
      <section className="components-section">
        <div className="container">
          <h2 className="section-title">组件预览</h2>
          <div className="components-preview">
            <div className="component-item">
              <h4>按钮(Button)</h4>
              <div className="component-demo">
                <button className="custom-button custom-button--primary">主要按钮</button>
                <button className="custom-button custom-button--secondary">次要按钮</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;