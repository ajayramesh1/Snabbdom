import { init,eventListenersModule,styleModule,classModule,h,propsModule } from 'snabbdom';
const container= document.getElementById('app')!;

interface Task {
    title:string,
    status:string
}

enum Status{
    todo="To do",
    completed="Mark as done"
}

let taskNode
let values:Task[]=[];


function updateValue(){
    const inputElement = document.getElementById('task') as HTMLInputElement;
    const inputValue = inputElement.value;
    values.push({
        title:inputValue,
        status:Status.todo
    });
    console.log(values)
    taskNode=patch(taskNode,tasks(values));
}

function updateStatus(index:number){
    values[index].status = values[index].status ===  Status.completed ?  Status.todo : Status.completed;
    console.log(values);
    taskNode=patch(taskNode,tasks(values));
}


function deleteTask(index:number){
    values.splice(index,1);
    taskNode=patch(taskNode,tasks(values));
}

const view=()=>{
    return (h('div',{class:{
        'container':true,
        'mt-3':true,
        "col-5":true
    }},[
        h('h1',{class:{
            'text-center':true
        }},"To do list"),
        h('input',{ props:{
            type:"text",
            placeholder:"Enter the value",
            id:'task',
        },
        class:{
            "form-control":true,
        }
    }),
    h('button',{class:{'btn':true,'btn-primary':true,'mt-2':true},on:{
        click:updateValue
    }},"Add"),
    ,
    taskNode=tasks(values)
    ,
    ]))
}
const tasks=(values:Task[])=>{
    return (h('div',values.map((value,index)=>
        h('div',{class:{'card':true,'p-2':true,'m-2':true}},[
            h('div',{class:{'row':true}},[
                h('div',{class:{'col-md-8':true,'text-decoration-line-through' :value.status === Status.completed,}},`${value.title}`),
                h('button',{class:{'col-md-3':true ,'btn':true ,
                     'btn-success':value.status === Status.todo,
                    'btn-warning':value.status === Status.completed},
                    on:{
                        click:()=>updateStatus(index)

                    }
                    },
                    ` ${value.status === Status.completed ? Status.todo : Status.completed}`),
            ]
        ),h('button',{class:{'btn':true,'btn-danger':true,'col-md-2':true},on:{click:()=>deleteTask(index)}},"Delete")])
    )))
}
const patch=init([styleModule,eventListenersModule,classModule,propsModule])
patch(container,view())