interface Circle{
    type: 'circle',
    radius: number
}
interface Square{
    type: 'square',
    length: number
}
interface Triangle{
    type:'triangle',
    length1:number,
    length2:number,
    length3:number,
}
type Shape=Circle|Square|Triangle

let shape:Shape={
    type:"circle",
    radius: 10
}
const myShape={
    type:"circle",
    radius: 10
}
if(isCircle(myShape)){
    console.log(myShape);
}
function isCircle(shape:any):shape is Circle{
    // 判断shape是否是一个对象
    if(typeof shape!=='object'){
        return false
    }
    // 判断对象是否具有type属性
    if(!shape.hasOwnProperty('type')){
        return false
    }
    // 判断type属性的值是否等于'circle'
    if(shape.type!=='circle'){
        return false
    }
    // 判断对象是否具有radius属性
    if(!shape.hasOwnProperty('radius')){
        return false
    }
    if(typeof shape.radius!=='number'){
        return false
    }
    return true
}
function getArea(shape:Shape){
    if(isCircle(shape)){
        return Math.PI*shape.radius**2
    }else{
        shape
    }

}