# 用途
## 用于模拟后端数据供前端调用,加上一个客户端就可以实现可视化增、删、改、查模拟数据。

# 环境
## 安装node8+(后端运行环境)
## 安装npm(node自带包管理工具类似java的Maven)
## 安装mongodb(数据库)

# 特性
## node+express+mongodb+jade
## 使用nodemon实现对文件的监控
## 使用Mongoose操作mongodb,支持对MongoDB的增、删、改、查

# 数据模型
```
{
    url:string,
    data:string //json字符串
}
```

# 用法

```
npm install
```
```
npm run dev
```