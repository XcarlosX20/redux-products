const toPathName = function (str){
    let pathName = '';
    for (let i = 0; i < str.length; i++) {
      let element = str[i];
      if(element === ' '){
        element = '-'
      pathName += element
      }else{
        pathName += element
      }
    }
    return pathName.toLowerCase()
  }
export default toPathName;