export function useMyStorage(){
	return {
		getStorage,
		setStorage,
		removeStorage,
		getStorageAll,
		clearStorage
	}
}

// 获取 从本地缓存中同步获取指定 key 对应的内容。
export const getStorage = (name: string): any => {
	let data = null

	try {
		data = window.localStorage.getItem(name);
		return data ? JSON.parse(data) : false;
	} catch (e) {
		data = window.localStorage.getItem(name);
		return data ? data : false;
	}
};
/**
 * 设置 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
 * @param {string} name name
 * @param {any} value value
 */
export const setStorage = (name: string, value: any): void => {
	try {
		// 如果 value 是对象，就把 value 转为 JSON 格式的字符串再存储
		if (typeof value === 'object') {
			value = JSON.stringify(value);
		}
		window.localStorage.setItem(name,value)
	} catch (e) {
		window.localStorage.setItem(name,value)
	}
};
// 删除 从本地缓存中同步移除指定 key。
export const removeStorage = (name: string): void => {
	window.localStorage.removeItem(name)
};
// 获取所有 同步获取当前 storage 的相关信息。
export const getStorageAll = (): any => {
	try {

	} catch (e) { }
};
// 清除所有 同步清理本地数据缓存。
export const clearStorage = (): void => {
	window.localStorage.clear()
};

/**
 * @description 数据缓存 storage
 * @method get() 获取 从本地缓存中同步获取指定 key 对应的内容。
 * @method set() 设置 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
 * @method remove() 删除 从本地缓存中同步移除指定 key。
 * @method getAll() 获取所有 同步获取当前 storage 的相关信息。
 * @method clear() 清除所有 同步清理本地数据缓存。
 */
export default {
	/**
	 * @description 获取 从本地缓存中同步获取指定 key 对应的内容。
	 * @param {string} name name
	 * @example get('name')
	 * @return any
	 */
	get: getStorage,
	/**
	 * @description 设置 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
	 * @param {string} name name
	 * @param {any} value value
	 * @example set('name','value')
	 */
	set: setStorage,
	/**
	 * @description 删除 从本地缓存中同步移除指定 key。
	 * @param {string} name name
	 * @example remove('name')
	 */
	remove: removeStorage,
	/**
	 * @description 获取所有 同步获取当前 storage 的相关信息。
	 * @example getAll()
	 * @return any
	 */
	getAll: getStorageAll,
	/**
	 * @description 清除所有 同步清理本地数据缓存。
	 * @example clear()
	 */
	clear:clearStorage
};
