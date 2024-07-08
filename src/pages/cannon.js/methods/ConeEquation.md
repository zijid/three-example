## ConeEquation 

### 描述

	圆锥方程。用于保持给定的身体世界向量对齐，或彼此倾斜在给定的角度内。

### 构造函数
	ConeEquation （ bodyA  bodyB  [options.axisA]  [options.axisB]  [options.angle]  [options.maxForce=1e6] ）

		参数：
		bodyA 身体
		bodyB 身体
		[options.axisA] Vec3 可选
		A 中的局部轴

		[options.axisB] Vec3 可选
		B 中的局部轴

		[options.angle] Vec3 可选
		要保持的“锥角”

		[options.maxForce=1e6] 数量 可选

```javascript
new CANNON.Box(new CANNON.Vec3(1,1,1))
```

### 方法

1. addToWlambda(deltalambda)

	向实体添加约束速度。
2. computeB() number

	计算 SPOOK 方程的 RHS
3. computeGiMf() number

	计算 G inv(M) f，其中 M 是每个物体的对角块质量矩阵，f 是物体上的力。
4. computeGiMGt() number

	计算 G inv(M) G'
5. computeGq() number

	计算 G*q，其中 q 是广义身体坐标
6. computeGW() number

	计算 G*W，其中 W 是体速度
7. computeGWlambda() number

	计算 G*Wlambda，其中 W 是体速度
8. computeInvC () number

	计算 SPOOK 方程的分母部分：C = G inv(M) G' + eps

10. setSpookParams () number

	重新计算 a、b、eps。


### 属性
1. a 数字
继承自 方程： src/equations/Equation.js:41

惊吓参数

2. angle 数字
定义于 src/equations/ConeEquation.js:29

要保持的锥角

3. b 数字
继承自 方程： src/equations/Equation.js:47

惊吓参数

4. bi 身体
继承自 方程： src/equations/Equation.js:29

5. bj 身体
继承自 方程： src/equations/Equation.js:35

6. enabled 布尔值
继承自 方程： src/equations/Equation.js:69

默认值： true

7. eps 数字
继承自 方程： src/equations/Equation.js:53

惊吓参数

8. jacobianElementA 雅可比元
继承自 方程： src/equations/Equation.js:59

9. jacobianElementB 雅可比元
继承自 方程： src/equations/Equation.js:64

10. maxForce 数字
继承自 方程： src/equations/Equation.js:24

11. minForce 数字
继承自 方程： src/equations/Equation.js:19