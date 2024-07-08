export function uid(separator="-"){
	if(!crypto&&crypto.randomUUID){
		return crypto.randomUUID();
	}else{
		const str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
		const arr=[]
		for (let index = 0; index < 3; index++) {
			const a=[]
			for (let i = 0; i < 4; i++) {
				a.push(str[Math.floor(Math.random()*52)])
			}
			arr.push(a.join(""))
		}
		const t=(Date.now()+"").slice(-5)+separator+(Math.random()+"").slice(-5)
		return arr.join(separator)+separator+t
	}
}