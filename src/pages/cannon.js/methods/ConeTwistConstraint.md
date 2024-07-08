## ConeTwistConstraint  

### 构造函数
构造函数
ConeTwistConstraint （ bodyA ， bodyB ， [options] ）

	参数：
		bodyA 身体
		bodyB 身体
		[options] 对象 可选
			[pivotA] Vec3 可选
			[pivotB] Vec3 可选
			[axisA] Vec3 可选
			[axisB] Vec3 可选
			[maxForce=1e6] 数量 可选

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

4. coneEquation  ConeEquation

5. equations Array

6. equationX  ContactEquation
7. equationY ContactEquation
8. equationZ ContactEquation
9. id number
继承自 方程： src/equations/Equation.js:64

10. pivotA vec3

	枢轴，在 bodyA 中本地定义。

11. pivotB vec3

	枢轴，在 bodyB 中本地定义。

12. twistEquation  RotationalEquation


