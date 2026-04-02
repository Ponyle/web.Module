import mitt from 'mitt'
const Bus = mitt()
export function bus () {
	return Bus
}
