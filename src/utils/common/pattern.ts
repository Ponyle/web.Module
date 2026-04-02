/**
 * 策略模式
 * @param actions 每一种可能执行的操作
 */
export function exeStrategyActions(actions: Common.StrategyAction[]) {
  actions.some(item => {
    const [flag, action] = item;
    if (flag) {
      action();
    }
    return flag;
  });
}
export function RouterConvert(data) {
	let result = [];
	let map = {};
	data.forEach(item => {
	    map[item.id] = item;
	});
	data.forEach(item => {
	    // item.pid 为null时 返回underfined
			let parent = null;
			if(item.name.split('_').length == 3) {
				let pParentId = map[item.parentId]['parentId']
				item.meta.newTab = false
				let parents = map[pParentId];

				if (item.meta.type&&map[item.parentId]) {
					//如果是按钮
					(map[item.parentId].meta.btn || (map[item.parentId].meta.btn = [])).push(item);
				}
				if(parents) {
					(parents.children || (parents.children = [])).push(item)
				}

			} else if (item.name.split('_').length == 2&&!item.meta.type&&item.meta.hide == true){
				item.meta.singleLayout = "basic"
				let pParentId = map[item.parentId]['parentId']
				item.meta.newTab = false
				let parents = map[pParentId];
				parent = parents
			} else {
				parent = map[item.parentId];
			}

	    if (parent) {
				if (item.meta.type) {
					(parent.meta.btn || (parent.meta.btn = [])).push(item);
				} else {
					(parent.children || (parent.children = [])).push(item);
				}

	    } else if(item.name.split('_').length !== 3) {
	        // 这里push的item是pid为null的数据
	        result.push(item);
	    }
	});
	console.log('result-------',result)
	return result;

}
export function convert(data) {
	console.log('data-999999',data)
	  let result = [];
	  let map = {};
	  data.forEach(item => {
	      map[item.id] = item;
	  });
	  data.forEach(item => {
	      // item.pid 为null时 返回underfined
	      let parent = map[item.pId];

	      if (parent) {
	        (parent.children || (parent.children = [])).push(item);
	      } else {
	          // 这里push的item是pid为null的数据
	          result.push(item);
	      }
	  });
	  return result;
	}
	const S4 = function() {
	  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	export function guid() {
	  return (S4() + S4() +'-' +S4() +'-' +S4() +'-' +S4() +'-' +S4() +S4() +S4()).toUpperCase();;
	}
	export function regText() {
		const bqReg = /<[^>]+>|&nbsp;/g   //去除所有的标签
		const imgReg = /<img.*?(?:>|\/>)/gi; //匹配img标签
		const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/gi; //匹配img标签内的 src=xxxx
		return {
			bqReg,
			imgReg,
			srcReg
		}
	}
	export function ChangeTimeStoM3(num) {
		let m = null
		let s = null
		let h = null
		m = Math.floor(num/60)%60
		s = num%60
		h = Math.floor(num/60/60)
		s = s<=9? '0'+s : s
		m = m<=9? '0'+m : m
		h = h<=9? '0'+h : h
		return h+':'+m+":"+ s
	}
