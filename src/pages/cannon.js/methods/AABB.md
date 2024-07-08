
## AABB
new CANNON.AABB({
	[upperBound]:vec3(0,0,0),//xyz的最小值
	[lowerBound]:vec3(0,0,0)//xyz的最大值
})

```javascript
new CANNON.AABB({
	upperBound:vec3(0,0,0),
	lowerBound:vec3(0,0,0)
})
```
### 描述

包围盒用来存储一个物体的边界。

### 方法
1. clone ()

 	克隆 AABB
2. contains (aabb) 布尔值

 	如果给定的 AABB 完全包含在该 AABB 中，则返回 true。

3. copy(aabb) this

 	将边界从 AABB 复制到此 AABB


4. extend (aabb) 

	扩展此 AABB，使其也覆盖给定的 AABB。


5. getCorners (a,b,c,d,e,f,g,h) 

	复制此 AABB 的八个角点，并将其存储在给定的向量中。


6. overlaps(aabb) 布尔值

	如果给定的 AABB 与此 AABB 重叠，则返回 true。



7. setFromPoints(points,position,quaternion,skinSize) AABB

	从一组点设置 AABB 边界。
	points Vec3 的数组。

	position Vec3
	quaternion 四元数
	skinSize 数字

8. toLocalFrame(frame,targetAABB) AABB

	将此 AABB 的尺寸存储在给定的向量中。

	frame Transform
	targetAABB AABB


9. toWorldFrame(frame,targetAABB) AABB

	将此 AABB 的尺寸存储在给定的向量中。

	frame Transform
	targetAABB AABB