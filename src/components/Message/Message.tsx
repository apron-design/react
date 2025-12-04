import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { AlertType } from '../Alert/Alert';
import { iconMap as alertIconMap } from '../Alert/Alert';
import '../Alert/Alert.scss';

// ============================================
// Message 全局管理器
// ============================================

interface MessageItem {
  id: string;
  type: AlertType;
  message: React.ReactNode;
  visible: boolean;
  leaving: boolean;
}

// 全局状态管理
let messageContainer: HTMLDivElement | null = null;
let messageRoot: ReturnType<typeof createRoot> | null = null;
let setGlobalMessages: React.Dispatch<React.SetStateAction<MessageItem[]>> | null = null;
const messageTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();

// 单个 Message 项组件（用于全局显示）
const MessageItemComponent: React.FC<{
  message: MessageItem;
  onRemove: (id: string) => void;
}> = ({ message, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    if (message.visible && !message.leaving) {
      setIsVisible(true);
      setIsLeaving(false);
      // 触发进入动画
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsEntering(true);
        });
      });
    } else if (message.leaving) {
      setIsLeaving(true);
      setIsEntering(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onRemove(message.id);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [message.visible, message.leaving, message.id, onRemove]);

  if (!isVisible) return null;

  const Icon = alertIconMap[message.type];
  const classNames = [
    'apron-alert',
    `apron-alert--${message.type}`,
    isEntering && !isLeaving && 'apron-alert--visible',
    isLeaving && 'apron-alert--leaving',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <span className="apron-alert__icon">
        <Icon />
      </span>
      <span className="apron-alert__message">{message.message}</span>
    </div>
  );
};

// 全局 Message 容器组件
const GlobalMessageManager: React.FC = () => {
  const [messages, setMessages] = useState<MessageItem[]>([]);

  useEffect(() => {
    setGlobalMessages = setMessages;
    return () => {
      setGlobalMessages = null;
    };
  }, []);

  const handleRemove = (id: string) => {
    if (setGlobalMessages) {
      setGlobalMessages((prev) => prev.filter((msg) => msg.id !== id));
    }
    // 清除定时器
    const timer = messageTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      messageTimers.delete(id);
    }
  };

  if (messages.length === 0) return null;

  return (
    <div className="apron-alert-container">
      {messages.map((msg) => (
        <MessageItemComponent key={msg.id} message={msg} onRemove={handleRemove} />
      ))}
    </div>
  );
};

// SSR 检查
const canUseDOM = typeof window !== 'undefined' && typeof document !== 'undefined';

// 确保容器存在
const ensureContainer = () => {
  if (!canUseDOM) return;

  if (!messageContainer) {
    messageContainer = document.createElement('div');
    messageContainer.className = 'apron-alert-root';
    document.body.appendChild(messageContainer);
    messageRoot = createRoot(messageContainer);
    messageRoot.render(<GlobalMessageManager />);
  }
};

// 生成唯一 ID
const generateId = () => {
  return `apron-message-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// 显示 Message
const showMessage = (
  type: AlertType,
  message: React.ReactNode,
  duration: number = 5000
): string => {
  ensureContainer();

  const id = generateId();
  const newMessage: MessageItem = {
    id,
    type,
    message,
    visible: true,
    leaving: false,
  };

  if (setGlobalMessages) {
    setGlobalMessages((prev) => [...prev, newMessage]);
  }

  // 自动关闭
  if (duration > 0) {
    const timer = setTimeout(() => {
      removeMessage(id);
    }, duration);
    messageTimers.set(id, timer);
  }

  return id;
};

// 移除 Message
const removeMessage = (id: string) => {
  if (setGlobalMessages) {
    setGlobalMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, leaving: true } : msg
      )
    );
  }
};

// 清除所有 Messages
const clearAllMessages = () => {
  if (setGlobalMessages) {
    setGlobalMessages((prev) =>
      prev.map((msg) => ({ ...msg, leaving: true }))
    );
  }
  // 清除所有定时器
  messageTimers.forEach((timer) => clearTimeout(timer));
  messageTimers.clear();
};

// 导出的 message 对象
export const message = {
  show: (type: AlertType, message: React.ReactNode, duration?: number) =>
    showMessage(type, message, duration),
  info: (message: React.ReactNode, duration?: number) =>
    showMessage('info', message, duration),
  success: (message: React.ReactNode, duration?: number) =>
    showMessage('success', message, duration),
  warning: (message: React.ReactNode, duration?: number) =>
    showMessage('warning', message, duration),
  error: (message: React.ReactNode, duration?: number) =>
    showMessage('error', message, duration),
  remove: removeMessage,
  clear: clearAllMessages,
};

