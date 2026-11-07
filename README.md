# Light Frame Studio Web

本目录包含照片边框工具的纯前端网页版本。

## 本地运行

直接用 Chrome 或 Edge 打开 index.html 即可。项目不依赖安装包、后端或账号。

## 已实现

- 单张 JPG / PNG / WebP / HEIC / HEIF 的点击上传与拖拽上传
- 6 个 Canvas 边框模板（按 1、3、5 / 2、4、6 排列）
- Logo、EXIF 信息、配色采样显示开关
- 本地 Logo 图片替换，固定高度、等比缩放
- JPEG EXIF 的焦距、光圈、快门、ISO 读取
- 本地颜色采样、实时预览与 JPG 下载
- 桌面和手机响应式界面

## 当前限制

- HEIC / HEIF 会在浏览器本机转换为 JPEG 后再处理；转换库不保留原文件的 EXIF 元数据，因此 EXIF 开关会自动关闭。
- 模板渲染依据当前示例图重建，若需像素级复刻，仍需提供每个模板的原始边框资源与输出规则。

## 第三方组件

- `vendor/heic2any.min.js`：heic2any 0.0.4（MIT License），用于在浏览器本机转换 HEIC / HEIF；许可证见 `vendor/heic2any.LICENSE.md`。
