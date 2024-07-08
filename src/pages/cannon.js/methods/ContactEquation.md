## ContactEquation  

### 描述

	约束基类

### 构造函数

	ContactEquation （ bodyA  bodyB ）

### 方法

1. addToWlambda (deltalambda )

	向实体添加约束速度。
2. computeB () number

	计算 SPOOK 方程的 RHS

3. computeGiMf () number

	计算 G inv(M) f，其中 M 是每个物体的对角块质量矩阵，f 是物体上的力。
4. computeGiMGt  () number

	计算 G inv(M) G'

5. computeGq   () number

	计算 G*q，其中 q 是广义身体坐标

6. computeGW   () number

	计算 G*W，其中 W 是体速度

7. computeGWlambda () number

	计算 G*Wlambda，其中 W 是体速度

8. computeInvC (eps) number

	计算 SPOOK 方程的分母部分：C = G inv(M) G' + eps

9. getImpactVelocityAlongNormal  () number

	获取接触点当前的相对速度。

10. setSpookParams ()

	重新计算 a、b、eps。


### 属性
1. a number

	惊吓参数

2. b number

	惊吓参数

3. bi 身体

4. bj 身体

5. enabled 布尔值

默认值： true

6. eps number

	惊吓参数

7. jacobianElementA 雅可比元

8. jacobianElementB 雅可比元

9. maxForce number

10. minForce number

11. ni 向量3

	接触正常，指向身体 i。

12. restitution number

13. ri 向量3

	从 bi 中心到接触点的面向世界的向量。

14. rj 向量3

	面向世界的向量，从身体 j 位置开始并到达接触点。