---
title: 样式演示
---

# 样式演示

本文档展示了优化后的 Dumi 样式效果。

## 标题样式

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 段落样式

这是一个普通的段落，用来展示优化后的段落样式。段落具有合适的行高和间距，确保阅读体验舒适。

段落之间的间距也经过精心调整，使得内容层次分明，易于阅读。

## 列表样式

### 无序列表

- 第一项
- 第二项
  - 子项 1
  - 子项 2
- 第三项

### 有序列表

1. 第一步
2. 第二步
   1. 子步骤 1
   2. 子步骤 2
3. 第三步

## 链接样式

这是一个 [示例链接](/)，鼠标悬停时会有下划线效果。

## 代码样式

行内代码示例：`console.log('Hello World')`

代码块示例：

```javascript
function hello(name) {
  console.log(`Hello, ${name}!`);
}

hello('Apron Design');
```

## 表格样式

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `primary` \| `secondary` \| `default` | `default` |
| size | 按钮大小 | `large` \| `medium` \| `small` | `medium` |
| disabled | 是否禁用 | boolean | false |

## 自定义组件演示

### 特色卡片

<div class="feature-section">
  <div class="feature-card">
    <div class="feature-card__icon">🎨</div>
    <h3 class="feature-card__title">设计美观</h3>
    <p class="feature-card__description">采用现代化设计语言，界面简洁美观</p>
  </div>
  <div class="feature-card">
    <div class="feature-card__icon">⚡</div>
    <h3 class="feature-card__title">性能卓越</h3>
    <p class="feature-card__description">优化的组件实现，确保流畅的用户体验</p>
  </div>
  <div class="feature-card">
    <div class="feature-card__icon">🔧</div>
    <h3 class="feature-card__title">易于使用</h3>
    <p class="feature-card__description">清晰的API设计，降低学习和使用成本</p>
  </div>
</div>

### 自定义按钮

<button class="custom-button custom-button--primary">主要按钮</button>
<button class="custom-button custom-button--secondary">次要按钮</button>
<button class="custom-button custom-button--primary custom-button--large">大型按钮</button>
<button class="custom-button custom-button--secondary custom-button--small">小型按钮</button>