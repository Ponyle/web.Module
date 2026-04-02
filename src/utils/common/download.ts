const TypeList = [
	{
		key:'.png',
		value:'image/png'
	},{
		key:'.jpg',
		value:'image/jpeg'
	},{
		key:'.jpeg',
		value:'image/jpeg'
	},{
		key:'.tif',
		value:'image/tiff'
	},{
		key:'.tiff',
		value:'image/tiff'
	},{
		key:'.docx',
		value:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
	},{
		key:'.doc',
		value:'application/msword'
	},{
		key:'.xls',
		value:'application/vnd.ms-excel'
	},{
		key:'.xlsx',
		value:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	},{
		key:'.mp3',
		value:'audio/mpeg'
	},{
		key:'.mp4',
		value:'video/mp4'
	},{
		key:'.json',
		value:'application/json'
	}
]
export function handleDownloadFile(res,FileName) {

	const contentDisposition = res.headers['content-disposition'];
	const patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
	const result = patt.exec(contentDisposition);
	const filename = FileName?FileName:result[1];
	const Type = filename.match(/.[^.]+$/)[0].toLowerCase()
	const type = TypeList.find(item => {
		if (item.key == Type) {
			return item.value
		}
	})
	const downloadElement = document.createElement('a');
	const blob = new Blob([res.data], {type});
	const href = window.URL.createObjectURL(blob); //创建下载的链接
	downloadElement.style.display = 'none';
	downloadElement.href = href;
	downloadElement.download = `${filename}` ; //下载后文件名
	document.body.appendChild(downloadElement);
	downloadElement.click(); //点击下载
	document.body.removeChild(downloadElement); //下载完成移除元素
	window.URL.revokeObjectURL(href); //释放掉blob对象

}
