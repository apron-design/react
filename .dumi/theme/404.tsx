import React from 'react';

const NotFoundPage: React.FC = () => {
  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">页面未找到</h2>
          <p className="error-description">抱歉，您访问的页面不存在或已被移除。</p>
          <div className="error-actions">
            <button className="btn btn-primary" onClick={goHome}>返回首页</button>
            <a href="/components" className="btn btn-secondary">查看组件</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;