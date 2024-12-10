# 使用 Node.js 官方映像作為基礎映像
FROM node:22

# 設置工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 yarn.lock 文件
COPY package.json yarn.lock ./

# 安裝依賴
RUN yarn install

# 複製其餘的專案文件
COPY . .

# 構建專案
RUN yarn build

# 暴露應用程序使用的端口
EXPOSE 3000

# 設置默認的命令來啟動應用
CMD [ "yarn", "dev" ]
