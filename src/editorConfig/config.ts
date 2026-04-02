import { IButtonMenu, IDomEditor, Boot } from '@wangeditor/editor'
class MyButtonMenu implements IButtonMenu {
    constructor() {
        this.title = '清空内容' // 自定义菜单标题
        this.iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="m899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-.3 1.5-.4 3-.4 4.4c0 14.4 11.6 26 26 26h723c1.5 0 3-.1 4.4-.4c14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390zm468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z"/></svg>' // 可选
        this.tag = 'button'
    }
    // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
    getValue(editor: IDomEditor): string | boolean {
			editor.clear()
      return false
    }
    // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
    isActive(editor: IDomEditor): boolean {
      return false
    }

    // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
    isDisabled(editor: IDomEditor): boolean {
      return false
    }

    // 点击菜单时触发的函数
    exec(editor: IDomEditor, value: string | boolean) {
			// console.log(editor)
			// let dom = editor.getHtml()
			// dom = '<div>'+'<p>icon</p>' + dom+'</div>'
			// editor.insertNode('13213')
        if (this.isDisabled(editor)) return
       editor.insertText('') // value 即 this.value(editor) 的返回值
    }

}
const menu1Conf = {
  key: 'empty', // 定义 menu key ：要保证唯一、不重复（重要）
  factory() {
    return new MyButtonMenu()
  },
}
export default function setupEdit() {
	Boot.registerMenu(menu1Conf)
}
