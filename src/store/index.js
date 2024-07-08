import { atom } from 'recoil';
export const main = atom({
	key: 'main',
	default: {
		title:"aaa"
	},
});
export const user = atom({
	key: 'user',
	default: {
		username:"aaa",
		password:"bbb",
		isLogin: true,
		roles: [
			"user",
			// "admin"
		]
	},
});
  