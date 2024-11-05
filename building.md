# Build Process
### Scripts
`pnpm build` - Builds all resources on the src folder.
`pnpm build --w` - Builds resources on watch mode, this watches for changes and builds that file on change.
`pnpm build --target=resource-name` - Build or watch a target resource.
`pnpm ui:build` - Builds the UI, this is probably temporary until a cleaner way it figured out.
`pnpm gen:config` - This will generate a server.cfg. You can configure settings, resources, etc.. in ./scripts/config.js
`pnpm asset:link` - Creates junction links for assets for maps, vehicles, etc... See below for more information

### Build Targets
You can select target resources to build rather than building the entire server. The param is --target. For example `pnpm build --target=evh-core`. This will only build evh-core. If you need to target multiple resources separate with a `,`, for example `pnpm build --target evh-core,evh-ui`.

### Asset Links
Will write later im lazy

###### ERP IS CRINGE