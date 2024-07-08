## Body 

### 描述

	所有体型的基类。

### 构造函数
	Body （ [options] ）
		参数：
		[options] 对象 可选
			[position] Vec3 可选 位置
			[velocity] Vec3 可选 速度
			[angularVelocity] Vec3 可选 角速度
			[quaternion] 四元数 可选 旋转
			[mass] 数量 可选	质量
			[material] 材质 可选 材质
			[type] 数量 可选  以下之一：Body.DYNAMIC、Body.STATIC 和 Body.KINEMATIC。
				Body.DYNAMIC 完全模拟动态身体。可以由用户手动移动，但通常它们根据力移动。动态主体可以与所有主体类型发生碰撞。动态物体总是具有有限的、非零的质量。
				Body.STATIC 静态刚体。它们不能移动，但可以与所有其他类型碰撞。静态物体总是具有无限的、零的质量。
				Body.KINEMATIC 运动刚体。它们不能移动，但可以与所有其他类型碰撞。运动物体总是具有无限的、零的质量。

			[linearDamping=0.01] 数量 可选 线性速度阻尼
			[angularDamping=0.01] 数量 可选 角速度阻尼
			[allowSleep=true] 布尔 可选 是否自动进入休眠
			[sleepSpeedLimit=0.1] 数量 可选 休眠速度限制
			[sleepTimeLimit=1] 数量 可选 休眠时间限制
			[collisionFilterGroup=1] 数量 可选 碰撞过滤器组
			[collisionFilterMask=1] 数量 可选 碰撞过滤器掩码
			[fixedRotation=false] 布尔 可选 是否固定旋转
			[shape] 形状 可选

```javascript
var body = new Body({
	mass: 1
});
var shape = new Sphere(1);
body.addShape(shape);
world.add(body);
```

### 方法

1. addEventListener(type,listener) this

	添加事件监听器
2. addShape(shape,offset,quaternion) this

	添加形状
3. applyForce(force,worldPoint) this
	对世界点施加力。例如，这可以是身体表面上的一个点。以这种方式施加力将增加 Body.force 和 Body.torque。
	应用力
	参数：
		force 向量3
		要添加的力的大小。

		worldPoint 向量3
		施加力的世界点。
4. applyImpulse(impulse,relativePoint) this

	应用冲量
5. applyLocalForce(force,relativePoint) this

	应用局部力
6. applyLocalImpulse(impulse,relativePoint) this

	应用局部冲量
7. computeAABB()

	更新AABB

8. dispatchEvent(event) this

	发出一个事件。

9. getVelocityAtWorldPoint( worldPoint,result) vec3

	获取body中某个点的世界速度。

10. hasEventListener ( type,listener ) 布尔值

	检查是否添加了事件监听器

11. pointToLocalFrame( worldPoint ,result ) vec3

	将世界点转换为局部身体坐标系。

12. pointToWorldFrame ( localPoint,result ) vec3

	将局部身体点转换为世界坐标系。

13. removeEventListener( type,listener  ) this

	删除事件监听器

14. sleep()

	强制睡眠

15. sleepTick (time)

	在每个时间步调用以更新内部睡眠计时器并根据需要更改睡眠状态。

	参数：
	time 数字
	世界时间以秒为单位

16. updateBoundingRadius()

	更新主体的边界半径。如果任何形状发生变化，则应执行此操作。

17. updateInertiaWorld()

	更新 .inertiaWorld 和 .invInertiaWorld

18. updateMassProperties()

	每当您改变身体形状或质量时都应该调用。

19. updateSolveMassProperties()

	如果身体正在睡觉，那么在求解过程中它应该是不动的/具有无限的质量。我们通过单独的“求解质量”来解决它。

20. vectorToLocalFrame(worldPoint，result) vec3

	将世界向量转换为局部身体坐标系。

21. vectorToWorldFrame (localVector,result) vec3

	将局部身体点转换为世界坐标系。



22. wakeUp ()

	唤醒身体。















