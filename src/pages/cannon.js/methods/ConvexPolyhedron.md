## ConvexPolyhedron

### 描述

	一组描述凸形状的多边形。

### 构造函数
	ConvexPolyhedron （ points,faces ）

	参数：
		points Array
		Vec3 的数组

		faces Array
		整数数组的数组，描述每个面中包含哪些顶点。

### 方法

1. calculateLocalInertia （ mass,target ）

	计算局部惯性
2. calculateWorldAABB(pos,quat,min,max) 

	计算世界AABB

3. clipAgainstHull(posA,quatA,hullB,posB,quatB,separatingNormal,minDist,maxDist,result)
	参数：
		posA 向量3
		quatA 四元数
		hullB 凸多面体
		posB 向量3
		quatB 四元数
		separatingNormal 向量3
		minDist 数字
		夹紧距离

		maxDist 数字
		result 大批
		接触点对象的数组，请参阅clipFaceAgainstHull
4. clipFaceAgainstHull(separatingNormal,posA,quatA,worldVertsB1,minDist,maxDist,Array )

	将脸夹在船体上。
	参数：
		separatingNormal 向量3
		posA 向量3
		quatA 四元数
		worldVertsB1 大批
		顶点位于世界坐标系中的 Vec3 数组。

		minDist 数字
		距离夹紧

		maxDist 数字
		Array 目的
		result 用于存储生成的接触点的数组。将是具有以下属性的对象：点、深度、法线。这些以世界坐标表示。
5. clipFaceAgainstPlane(inVertices,outVertices,planeNormal,planeConstant) 

	将船体中的一张脸夹在飞机背面。
	参数：
		inVertices 大批
		outVertices 大批
		planeNormal 向量3
		planeConstant 数字
		数学平面方程中的常数

6. computeEdges() 

	计算独特的边

7. computeNormals() 

	计算面部的法线。将重用 .faceNormals 数组中现有的 Vec3 对象（如果存在）。

8. computeWorldFaceNormals(quat) 

	更新 .worldVertices 并将 .worldVerticesNeedsUpdate 设置为 false。

9. findSeparatingAxis(hullB,posA,quatA,posB,quatB,target)布尔

	获取接触点当前的相对速度。

10. getAveragePointLocal(target ) vec3

	获取所有顶点位置的平均值

11. getFaceNormal(target ) vec3

	获取所有顶点位置的平均值
	参数：
		target 向量3
		返回：
		向量3：
12. getFaceNormal(i,target ) 

	从顶点计算面的法线

13. static getFaceNormal(va,vb,vc,target ) 

	给定 3 个顶点获取面法线

	参数：
		va 向量3
		vb 向量3
		vc 向量3
		target 向量3
14. getPlaneConstantOfFace(face_i) number

	参数：
		face_i 数字
		脸部指数
15. pointIsInside (p ) 布尔

	检查 p 是否在多面体内部。必须在本地坐标中。当且仅当从该点到其他点的所有向量的方向都在小于它周围球面的一半时，该点位于其他点的凸包之外。

	参数：
		p 向量3
		以局部坐标给出的点
16. static project (hull,axis,pos,quat,result) 

	获取投影到轴上的位置 (pos,quat) 处凸包的最大和最小点积。结果保存在数组 maxmin 中。

	参数：
		hull 凸多面体
		axis 向量3
		pos 向量3
		quat 四元数
		result 大批
		result[0] 和 result[1] 将分别设置为最大值和最小值。
17. testSepAxis(axis,hullB,posA,quatA,posB,quatB) number

	针对两个船体测试分离轴。两个外壳都投影到轴上，如果有重叠，则返回重叠大小。

	参数：
		axis 向量3
		hullB 凸多面体
		posA 向量3
		quatA 四元数
		posB 向量3
		quatB 四元数
		返回：
		数字：
		重叠深度，如果没有穿透则为 FALSE。
18. transformAllPoints(offset,quat) 

	变换所有局部点。将改变.vertices

	参数：
		offset 向量3
		quat 四元数
19. updateBoundingSphereRadius()

20. volume() number

	获取近似凸体积

### 属性
1. boundingSphereRadius 数字

该形状的局部边界球体半径。

2. collisionResponse 布尔值
继承自 Shape： src/shapes/Shape.js:37

与其他物体接触时是否产生接触力。请注意，将生成联系人，但它们将被禁用。

3. faceNormals 大批
定义于 src/shapes/ConvexPolyhedron.js:49

Vec3 数组

4. faces 大批
定义于 src/shapes/ConvexPolyhedron.js:42

整数数组的数组，表示每个面由哪些顶点组成

5. id 数字
继承自 Shape： src/shapes/Shape.js:17

形状的标识符。

6. material 材料
继承自 Shape： src/shapes/Shape.js:43

7. type 数字
继承自 Shape： src/shapes/Shape.js:23

该形状的类型。子类必须设置为 int > 0。

8. uniqueAxes 大批
定义于 src/shapes/ConvexPolyhedron.js:67

如果给定，这些本地定义的标准化轴是在进行分离轴检查时唯一被检查的轴。

9. uniqueEdges 大批
定义于 src/shapes/ConvexPolyhedron.js:60

Vec3 数组

10. vertices 大批
定义于 src/shapes/ConvexPolyhedron.js:32

Vec3 数组