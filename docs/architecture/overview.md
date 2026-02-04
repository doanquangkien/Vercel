# MECWISH V2.0 - Architecture Overview

## Core Principles

1. **Modular Monolith**: Independent, self-contained modules
2. **Event-Driven**: Loose coupling through EventBus
3. **Data Abstraction**: Database-agnostic layer
4. **No Build Complexity**: ES6 Modules + Alpine.js

## Layer Architecture

```
┌─────────────────────────────────────┐
│         UI Layer (Alpine.js)        │
├─────────────────────────────────────┤
│      Controllers (View Logic)       │
├─────────────────────────────────────┤
│       Services (Business Logic)     │
├─────────────────────────────────────┤
│     Store (State Management)        │
├─────────────────────────────────────┤
│   Core (Kernel, Router, EventBus)   │
├─────────────────────────────────────┤
│  Data Adapter (IndexedDB/REST API)  │
└─────────────────────────────────────┘
```

## Module Communication

Modules communicate via EventBus:
```javascript
// Module A
App.eventBus.emit('ORDER:CREATED', orderData);

// Module B
App.eventBus.on('ORDER:CREATED', (data) => {
  // Update stock
});
```

## See Also

- [Getting Started Guide](../guides/getting-started.md)
- [Module API Reference](../api/modules.md)
