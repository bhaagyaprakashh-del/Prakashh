import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export interface ActionContext {
  id?: string;
  endpoint?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  target?: string;
  confirm?: string;
  data?: any;
}

export const useActions = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [modals, setModals] = useState<Record<string, boolean>>({});

  const setLoading = (key: string, loading: boolean) => {
    setIsLoading(prev => ({ ...prev, [key]: loading }));
  };

  const openModal = (modalId: string, data?: any) => {
    setModals(prev => ({ ...prev, [modalId]: true }));
    if (data) {
      // Store modal data for use in modal components
      sessionStorage.setItem(`modal_${modalId}_data`, JSON.stringify(data));
    }
  };

  const closeModal = (modalId: string) => {
    setModals(prev => ({ ...prev, [modalId]: false }));
    sessionStorage.removeItem(`modal_${modalId}_data`);
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const submitForm = async (context: ActionContext) => {
    const key = `form_${context.endpoint || 'default'}`;
    setLoading(key, true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Operation completed successfully');
      
      // Close modal if it was a modal form
      if (context.target && context.target.includes('modal')) {
        closeModal(context.target.replace('#', ''));
      }
      
      // Refresh data or navigate
      if (context.target && context.target.includes('refresh')) {
        window.location.reload();
      }
    } catch (error) {
      toast.error('Operation failed. Please try again.');
    } finally {
      setLoading(key, false);
    }
  };

  const confirmAction = async (context: ActionContext) => {
    const confirmed = window.confirm(context.confirm || 'Are you sure?');
    if (!confirmed) return;

    const key = `action_${context.id || 'default'}`;
    setLoading(key, true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Action completed successfully');
      
      // Refresh or navigate after action
      if (context.target) {
        if (context.target.includes('refresh')) {
          window.location.reload();
        } else if (context.target.startsWith('/')) {
          navigate(context.target);
        }
      }
    } catch (error) {
      toast.error('Action failed. Please try again.');
    } finally {
      setLoading(key, false);
    }
  };

  const downloadFile = async (context: ActionContext) => {
    const key = `download_${context.id || 'default'}`;
    setLoading(key, true);

    try {
      // Simulate file download
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a mock download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `export_${Date.now()}.pdf`;
      link.click();
      
      toast.success('Download started');
    } catch (error) {
      toast.error('Download failed. Please try again.');
    } finally {
      setLoading(key, false);
    }
  };

  const toggleElement = (targetSelector: string) => {
    const element = document.querySelector(targetSelector);
    if (element) {
      element.classList.toggle('hidden');
    }
  };

  const refreshTable = async (context: ActionContext) => {
    const key = `refresh_${context.target || 'default'}`;
    setLoading(key, true);

    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Data refreshed');
      window.location.reload();
    } catch (error) {
      toast.error('Refresh failed. Please try again.');
    } finally {
      setLoading(key, false);
    }
  };

  return {
    isLoading,
    modals,
    openModal,
    closeModal,
    navigateTo,
    submitForm,
    confirmAction,
    downloadFile,
    toggleElement,
    refreshTable,
    setLoading
  };
};