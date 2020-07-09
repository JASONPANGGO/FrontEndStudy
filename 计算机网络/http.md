# 缓存

## 强缓存

1. Expires
   1. 存储一个HTTP日期，请求时根据系统时间和这个日期比对，如果超过Expires的值就缓存失效。
   2. 优先级最低。

2. Cache-Control
   1. HTTP/1.1新增的属性。
   2. 在请求头和响应头都可以使用。
   3. 常用属性值：
      1. max-age：秒，距离发起的时间的秒数，超过间隔的秒数缓存失效。
      2. no-cache：不使用强缓存，需要与服务器验证缓存是否新鲜。
      3. no-store：禁止使用缓存（包括协商缓存），每次都向服务器请求最新的资源。
      4. private：专用于个人的缓存，中间代理和CDN都不能缓存此相应。
      5. public：响应可以被中间代理，CDN等缓存。
      6. must-revalidate：在缓存过期前可以使用，过期后必须向服务器验证。

3. Pragma
   1. 优先级最高。
   2. 只能用来设置no-cache，始终请求资源。

## 协商缓存

1. Etag/If-None-Match
   1. 值是一串hash码，代表一个资源的标识符，服务端文件变化时，hash码也会随之改变。
   2. 请求头带上If-None-Match中的hash，服务端将此和所有资源Etag比对，没有匹配才返回资源，200。
   3. Etag属性的比对是弱比对算法，两个文件的内容相同即使页脚的生成时间不同也可以认为相同。
   4. 示例：
        ```
        If-None-Match: "bfc13a64729c4290ef5b2c2730249c88ca92d82d"
        If-None-Match: W/"67ab43", "54ed21", "7892dd"
        If-None-Match: *
        ```
        * W/前缀表示提示应该使用弱比对算法，其实没有必要，因为If-None-Match只有该比对算法。
        * `*`号用于PUT方法上传资源时检测相同识别ID的资源是否已经上传过。

2. Last-Modified/If-Modified-Since
   1. 第一次请求时，服务端把文件的最后修改时间放到响应头的Last-Modified中。
   2. 第二次发起请求时，请求头会带上上一次响应头的Last-Modified的值放在If-Modified-Since里面，服务端根据文件的最后更改时间和这个值进行比较，如果相等就返回304，浏览器加载缓存。



# HTTP2

## 优势

1. 二进制分帧层（Binary Framing Layer）
2. 多路复用
3. 服务端推送
4. Header压缩（HPACK）
5. 应用层的重置连接
6. 请求优先级设置
7. 流量控制
8. HTTP/1的以下优化可以弃用
   1. 