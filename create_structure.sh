#!/bin/bash

# Create directory structure
mkdir -p public/assets/{images,icons,fonts}
mkdir -p src/core/{kernel,events,data,ui,state,http,security,utils,config}
mkdir -p src/core/data/providers
mkdir -p src/core/state/middleware
mkdir -p src/modules/{auth,dashboard,products,orders,customers,payments,discounts,affiliate,settings}
mkdir -p src/shared/{components,directives,mixins}
mkdir -p src/styles/{theme/themes,base,components,animations}
mkdir -p src/types
mkdir -p tests/{unit/{core,modules},integration,e2e}
mkdir -p scripts
mkdir -p docs/{architecture,api,guides}

# Create module structures
for module in auth dashboard products orders customers payments discounts affiliate settings; do
    mkdir -p src/modules/$module/{views/{admin,client},controllers/{admin,client}}
done

# Create empty files in public
touch public/index.html
touch public/admin.html

# Create Core files
touch src/core/kernel/{Kernel.js,Router.js,ModuleLoader.js,LifecycleManager.js}
touch src/core/events/{EventBus.js,EventLogger.js,eventTypes.js}
touch src/core/data/{DatabaseAdapter.js,QueryBuilder.js,CacheManager.js}
touch src/core/data/providers/{IndexedDBProvider.js,LocalStorageProvider.js,RestAPIProvider.js}
touch src/core/ui/{UISystem.js,LoadingOverlay.js,NotificationCenter.js,DialogManager.js}
touch src/core/state/{Store.js,createStore.js}
touch src/core/state/middleware/{logger.js,persist.js}
touch src/core/http/{HttpClient.js,Interceptors.js,ErrorHandler.js}
touch src/core/security/{AuthManager.js,PermissionGuard.js,CryptoUtils.js}
touch src/core/utils/{format.js,validate.js,debounce.js,logger.js}
touch src/core/config/{app.config.js,env.config.js,constants.js}
touch src/core/index.js

# Create module files for each module
for module in auth dashboard products orders customers payments discounts affiliate settings; do
    touch src/modules/$module/index.js
    touch src/modules/$module/${module}.service.js
    touch src/modules/$module/${module}.store.js
    touch src/modules/$module/${module}.routes.js
    touch src/modules/$module/${module}.validators.js
    touch src/modules/$module/views/admin/{${module^}List.html,${module^}Form.html,${module^}Detail.html}
    touch src/modules/$module/views/client/{${module^}Catalog.html,${module^}Detail.html}
    touch src/modules/$module/controllers/admin/${module^}AdminController.js
    touch src/modules/$module/controllers/client/${module^}ClientController.js
done

# Create shared files
touch src/shared/components/{DataTable.js,FormBuilder.js,ImageUploader.js,Pagination.js}
touch src/shared/directives/{x-currency.js,x-permission.js}
touch src/shared/mixins/formMixin.js

# Create style files
touch src/styles/theme/tokens.css
touch src/styles/theme/variables.css
touch src/styles/theme/themes/{light.css,dark.css}
touch src/styles/base/{reset.css,typography.css,utilities.css}
touch src/styles/components/{buttons.css,forms.css,cards.css,tables.css}
touch src/styles/animations/transitions.css
touch src/styles/main.css

# Create type files
touch src/types/{core.types.js,module.types.js,api.types.js}

# Create main entry
touch src/main.js

# Create test files
touch tests/unit/core/{Kernel.test.js,EventBus.test.js,DatabaseAdapter.test.js}
touch tests/unit/modules/products.test.js
touch tests/integration/product-flow.test.js
touch tests/e2e/checkout.test.js

# Create script files
touch scripts/{dev.js,build.js,seed.js}

# Create doc files
touch docs/architecture/overview.md
touch docs/api/modules.md
touch docs/guides/getting-started.md

# Create root files
touch .env.example
touch .gitignore
touch package.json
touch jsconfig.json
touch tailwind.config.js
touch README.md

echo "Structure created successfully!"
