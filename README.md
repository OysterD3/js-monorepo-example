# js-monorepo-example
The examples are using [pnpm](https://pnpm.io/).  
Please navigate into each folder for more information.

Currently, only available for `basic`  
I will add more examples when I am free.

## Getting Started
```bash
cd basic-pnpm
pnpm i # or pnpm install
pnpm dev # this command will start dev server for 3 workpsaces

# run script in workspace(s)
# visit https://pnpm.io/filtering for more info
pnpm start:dev --filter=api

# install package in workspace(s)
pnpm i dayjs --filter=api

# install package in root
pnpm i -w dayjs
```


## Contribute
Feel free to create PR, using only `pnpm`
