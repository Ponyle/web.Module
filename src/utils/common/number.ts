/**
 * 根据数字获取对应的汉字
 * @param num - 数字(0-10)
 */
export function getHanByNumber(num: number) {
  const HAN_STR = '零一二三四五六七八九十';
  return HAN_STR.charAt(num);
}

/**
 * 将总秒数转换成 分：秒
 * @param seconds - 秒
 */
export function transformToTimeCountDown(seconds: number) {
  const SECONDS_A_MINUTE = 60;
  function fillZero(num: number) {
    return num.toString().padStart(2, '0');
  }
  const minuteNum = Math.floor(seconds / SECONDS_A_MINUTE);
  const minute = fillZero(minuteNum);
  const second = fillZero(seconds - minuteNum * SECONDS_A_MINUTE);
  return `${minute}: ${second}`;
}

/**
 * 获取指定整数范围内的随机整数
 * @param start - 开始范围
 * @param end - 结束范围
 */
export function getRandomInteger(end: number, start = 0) {
  const range = end - start;
  const random = Math.floor(Math.random() * range + start);
  return random;
}

export 	function UpdatePwd() {
	//8-28位 大小写字母数字 特殊字符
	//!@#$%^&*.?
	var str = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
							'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
							'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
							'@','#'];
	const num = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
	const capital = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
	const minuscule = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
	const spechars =['@','#']
	let pwdLength = 6
	let arr = [str,num,capital,minuscule,spechars];
	for(let i = 0; i < pwdLength-5; i++) {
		arr.push(str);
	}
	let pwdStr = '';
	arr.forEach(item => {
		pwdStr += item[Math.round(Math.random()*(item.length-1))]
	})
	return pwdStr
}

export function toChinesNum(num) {
	let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
	let unit = ['', '十', '百', '千', '万']
	num = parseInt(num)
	let getWan = (temp) => {
		let strArr = temp.toString().split('').reverse()
		let newNum = ''
		let newArr = []
		strArr.forEach((item, index) => {
			
			if (index == 1&&item == 1&&num<19) {
				newArr.unshift(item === '0' ? changeNum[item] : unit[index])
			} else {
				newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index])
			}

		})
		let numArr = []

		newArr.forEach((m, n) => {
			if (m !== '零') numArr.push(n)
		})
		if (newArr.length > 1) {
			newArr.forEach((m, n) => {
				if (newArr[newArr.length - 1] === '零') {
					if (n <= numArr[numArr.length - 1]) {
						newNum += m
					}
				} else {
					newNum += m
				}
			})
		} else {
			newNum = newArr[0]
		}

		return newNum
	}
	let overWan = Math.floor(num / 10000)
	let noWan = num % 10000
	if (noWan.toString().length < 4) {
		noWan = '0' + noWan
	}
	return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}