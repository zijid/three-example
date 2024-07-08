## RigidVehicle

### 描述

	一组描述凸形状的多边形。

### 构造函数
	构造函数
		RigidVehicle （ [options.chassisBody] ）

		参数：
		[options.chassisBody] 底盘的身体

### 方法

1. addToWorld （ world ）
定义于 src/objects/RigidVehicle.js:162

将车辆及其约束添加到世界中。

参数：
world 世界

2. addWheel （ options ）
定义于 src/objects/RigidVehicle.js:45

添加一个轮子

参数：

3. options 目的
[isFrontWheel] 布尔 可选
[position] Vec3 可选
车轮在底盘主体中的位置。

[direction] Vec3 可选
车轮沿悬架的滑动方向。

[axis] Vec3 可选
车轮的旋转轴，在底盘中局部定义。

[body] 本体 可选
轮体。

4. applyWheelForce （ value  wheelIndex ）
定义于 src/objects/RigidVehicle.js:146

在其中一个车轮上施加扭矩。

参数：
value 数字
wheelIndex 整数

5. disableMotor （ value  wheelIndex ）
定义于 src/objects/RigidVehicle.js:123

设置铰链约束的目标旋转速度。

参数：
value 数字
wheelIndex 整数

6. getWheelSpeed （ wheelIndex ）

定义于 src/objects/RigidVehicle.js:209

获取车轮当前转速

参数：
wheelIndex 整数

7. removeFromWorld （ world ）

定义于 src/objects/RigidVehicle.js:189

将车辆及其约束从世界中移除。

参数：
world 世界

8. setMotorSpeed （ value  wheelIndex ）

定义于 src/objects/RigidVehicle.js:111

设置铰链约束的目标旋转速度。

参数：
value 数字
wheelIndex 整数

9. setSteeringValue （ value  wheelIndex ）

定义于 src/objects/RigidVehicle.js:89

设置车轮的转向值。

参数：
value 数字
wheelIndex 整数

10. setWheelForce （ value  wheelIndex ）

定义于 src/objects/RigidVehicle.js:136

设置每个时间步施加在其中一个车轮上的车轮力

参数：
value 数字
wheelIndex 整数

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