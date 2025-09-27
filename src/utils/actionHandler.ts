import { ActionContext } from '../hooks/useActions';

export class ActionHandler {
  private static instance: ActionHandler;
  private actionMap: Map<string, (context: ActionContext) => void> = new Map();
  private debounceMap: Map<string, number> = new Map();

  static getInstance(): ActionHandler {
    if (!ActionHandler.instance) {
      ActionHandler.instance = new ActionHandler();
    }
    return ActionHandler.instance;
  }

  registerAction(actionName: string, handler: (context: ActionContext) => void) {
    this.actionMap.set(actionName, handler);
  }

  executeAction(actionName: string, context: ActionContext) {
    // Debounce double-clicks
    const key = `${actionName}_${context.id || 'default'}`;
    const now = Date.now();
    const lastExecution = this.debounceMap.get(key) || 0;
    
    if (now - lastExecution < 300) {
      return; // Ignore if executed within 300ms
    }
    
    this.debounceMap.set(key, now);

    const handler = this.actionMap.get(actionName);
    if (handler) {
      handler(context);
    } else {
      console.warn(`No handler registered for action: ${actionName}`);
    }
  }

  // Global click handler for event delegation
  handleGlobalClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const actionElement = target.closest('[data-action]') as HTMLElement;
    
    if (!actionElement) return;

    const action = actionElement.getAttribute('data-action');
    if (!action) return;

    // Prevent default if it's a link or form element
    if (actionElement.tagName === 'A' || actionElement.tagName === 'BUTTON') {
      event.preventDefault();
    }

    // Extract context from data attributes
    const context: ActionContext = {
      id: actionElement.getAttribute('data-id') || undefined,
      endpoint: actionElement.getAttribute('data-endpoint') || undefined,
      method: (actionElement.getAttribute('data-method') as any) || 'POST',
      target: actionElement.getAttribute('data-target') || undefined,
      confirm: actionElement.getAttribute('data-confirm') || undefined,
      data: actionElement.getAttribute('data-data') ? 
        JSON.parse(actionElement.getAttribute('data-data')!) : undefined
    };

    this.executeAction(action, context);
  };

  // Initialize global event listeners
  init() {
    document.addEventListener('click', this.handleGlobalClick);
    
    // Handle keyboard events for accessibility
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const target = event.target as HTMLElement;
        if (target.hasAttribute('data-action') && target.getAttribute('role') === 'button') {
          event.preventDefault();
          this.handleGlobalClick(event);
        }
      }
    });
  }

  // Cleanup
  destroy() {
    document.removeEventListener('click', this.handleGlobalClick);
  }
}

// Export singleton instance
export const actionHandler = ActionHandler.getInstance();