/*
 * 把url参数部分解析成对象
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse(){
  let url = window.localtion.search
  let obj ={}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=12345','&a=b']
  if(arr){
    arr.forEach((item)=>{
      let tempArr= item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let value = decodeURIComponent(tempArr[1])
      obj.key=value
    })
    return obj
  }
}