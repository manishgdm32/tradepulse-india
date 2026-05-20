import { useState, useCallback } from 'react';
import type { Notification } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 15);

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: generateId(),
      type: 'signal',
      title: 'New Scalping Signal',
      message: 'BUY TCS at 3992 - Target 4025, SL 3965',
      timestamp: new Date(Date.now() - 2 * 60000),
      read: false,
      actionUrl: '/signals',
    },
    {
      id: generateId(),
      type: 'order',
      title: 'Order Executed',
      message: 'BUY 50 TCS @ 3985 executed successfully',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: true,
      actionUrl: '/orders',
    },
    {
      id: generateId(),
      type: 'alert',
      title: 'Price Alert',
      message: 'RELIANCE crossed above 2850',
      timestamp: new Date(Date.now() - 30 * 60000),
      read: true,
    },
  ]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return { notifications, addNotification, markAsRead, clearAll };
}