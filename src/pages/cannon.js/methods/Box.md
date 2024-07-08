## Box 

### 描述

	3D 盒子形状,立方体，大小为正常宽高长的一半
### 构造函数
	

```javascript
new CANNON.Box(new CANNON.Vec3(1,1,1))
```

### 方法

1. calculateLocalInertia (mass,target) vec3

	计算局部惯性

2. getSideNormals(sixTargetVectors,quat) Array

	获取盒子 6 面法线
	参数：
	sixTargetVectors Array
	6 个向量的数组，用于存储生成的侧面法线。

	quat 四元数
	应用于法线向量的方向。如果未提供，矢量将相对于本地框架。

3. updateBoundingSphereRadius() number

	计算边界球体半径。结果存储在属性 .boundingSphereRadius 中

4. updateConvexPolyhedronRepresentation() 

	更新用于某些碰撞的局部凸多面体表示。

5. volume (force,relativePoint) number

	获取该形状的体积


### 属性

1. boundingSphereRadius

	该形状的局部边界球体半径。

2. collisionResponse 

	与其他物体接触时是否产生接触力。请注意，将生成联系人，但它们将被禁用。

3. convexPolyhedronRepresentation 

	例如，接触生成器用于与其他凸多面体进行接触

4. halfExtents 

	宽高长

5. id 

	形状的标识符。

6. material 
	材料

7. type 

	该形状的类型。子类必须设置为 int > 0。