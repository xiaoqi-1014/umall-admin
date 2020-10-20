import vue from 'vue'

let obj={

}

for(let i in obj){
    vue.component(i,obj[i])
}