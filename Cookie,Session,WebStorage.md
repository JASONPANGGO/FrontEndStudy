# 从登录验证谈cookie, session, WebStorage。

1. > `C` >>>>> 发送包含用户名和密码的表单进行登录验证 >>>>> `S`

登录成功，服务端产生session对象存储在服务端，生成对应的sessionID，该sessionID以cookie的形式返回给客户端。

> `cookie`：存储在客户端，大小限制为4kb，只能存储字符串，通过响应头的字段`Set-Cookie`的`Expires`(设置到期的时间点)或者`Max-Age`(设置离到期需要的秒数)来设置`cookie`的有效期，`Max-Age`优先于`Expires`。如果没有设置，则在会话结束即浏览器关闭后自动销毁。不可跨域。

> `Set-Cookie: id:61d6w5d4d; Expires=Wed, 21 Oct 2015 07:28:00 GMT;`这个字段的设置意味着指示客户端建立一个cookie并在之后过期时间之前每次请求都自动发送cookie到服务端。

> `session`：存储在服务端，大小无限制，通常是表之类的数据结构，用于如购物车，保存用户登录信息。需要得到一个`session_id`来从`session`中查找到对应的数据，`session_id`一般保存在`cookie`中。保存`session`的方式可以是缓存，数据库，文件...(大多数以文本形式保存在服务端或者使用redis缓存)

2. > `C`<<<<<< 服务端返回session_id或token给客户端 <<<<< `S`  

> `session_id`：客户端初始登录之后服务端检查cookie中是否携带session_id如果有的话就根据该id从session中查找到相应的数据并继续该会话，如果没有的话

> `token`：