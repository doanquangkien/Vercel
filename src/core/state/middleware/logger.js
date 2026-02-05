/**
 * logger.js - Store logger middleware
 */

export function loggerMiddleware(storeName) {
  return (oldState, updates) => {
    console.group(`[Store:${storeName}] State Update`);
    console.log('Previous:', oldState);
    console.log('Updates:', updates);
    console.log('Next:', { ...oldState, ...updates });
    console.groupEnd();
    
    return updates;
  };
}

export default loggerMiddleware;
