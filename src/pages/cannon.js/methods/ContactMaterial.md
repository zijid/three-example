## ContactMaterial   

### 描述

	定义两种材料相遇时会发生什么。

### 构造函数

	ContactMaterial （ m1  m2  [options] ）

	参数：
		m1 材料
		m2 材料
		[options] 对象 可选
			[friction=0.3] 数量 可选
			[restitution=0.3] 数量 可选
			[contactEquationStiffness=1e7] 数量 可选
			[contactEquationRelaxation=3] 数量 可选
			[frictionEquationStiffness=1e7] 数量 可选
			[frictionEquationRelaxation=3] 数量 可选


### 属性
1. contactEquationRelaxation  number

	生成的接触方程的弛豫时间

2. contactEquationStiffness  number

	生成的接触方程的刚度

3. friction number

	摩擦系数

4. frictionEquationRelaxation  number

	生成的摩擦方程的弛豫时间

5. frictionEquationStiffness number

	产生的摩擦方程的刚度

6. id number

	该材料的标识符

7. materials  Array

	参赛材料


8. restitution  雅可number比元

	恢复系数