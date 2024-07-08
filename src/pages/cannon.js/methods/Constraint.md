## Constraint  

### 描述

	约束基类

### 构造函数
	
构造函数
Constraint （ bodyA  bodyB  [options] ）

	参数：
		bodyA 身体
		bodyB 身体
		[options] 对象 可选
			[collideConnected=true] 布尔 可选
			[wakeUpBodies=true] 布尔 可选

### 方法

1. disable()

	禁用约束中的所有方程。

2. enable() 

	启用约束中的所有方程。

3. update() 

	用数据更新所有方程。

### 属性
1. bodyA  Body

2. bodyB  Body

3. collideConnected 布尔值

	如果您希望实体在连接时发生碰撞，请设置为 true。
4. equations Array

5. id number
