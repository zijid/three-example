## ArrayCollisionMatrix 

### 描述

	碰撞矩阵检测两个矩阵舒服接触的三角形数组
	矩阵存储碰撞对，每个碰撞对由两个索引组成

### 构造函数

```javascript
new CANNON.ArrayCollisionMatrix(numObjects)
```

### 参数

1. numObjects 数字

	矩阵中存储的最大对象数

### 方法

1. get(i,j) 数字

2. reset()

	将所有元素设置为零
3. set(i,j,value)
	设置一个元素

4. setNumObjects (n)

	设置最大对象数

