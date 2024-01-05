"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var snabbdom_1 = require("snabbdom");
var container = document.getElementById('app');
var Status;
(function (Status) {
    Status["todo"] = "To do";
    Status["completed"] = "Mark as done";
})(Status || (Status = {}));
var taskNode;
var values = [];
function updateValue() {
    var inputElement = document.getElementById('task');
    var inputValue = inputElement.value;
    values.push({
        title: inputValue,
        status: Status.todo
    });
    console.log(values);
    taskNode = patch(taskNode, tasks(values));
}
function updateStatus(index) {
    values[index].status = values[index].status === Status.completed ? Status.todo : Status.completed;
    console.log(values);
    taskNode = patch(taskNode, tasks(values));
}
function deleteTask(index) {
    values.splice(index, 1);
    taskNode = patch(taskNode, tasks(values));
}
var view = function () {
    return ((0, snabbdom_1.h)('div', { class: {
            'container': true,
            'mt-3': true,
            "col-5": true
        } }, [
        (0, snabbdom_1.h)('h1', { class: {
                'text-center': true
            } }, "To do list"),
        (0, snabbdom_1.h)('input', { props: {
                type: "text",
                placeholder: "Enter the value",
                id: 'task',
            },
            class: {
                "form-control": true,
            }
        }),
        (0, snabbdom_1.h)('button', { class: { 'btn': true, 'btn-primary': true, 'mt-2': true }, on: {
                click: updateValue
            } }, "Add"),
        ,
        taskNode = tasks(values),
    ]));
};
var tasks = function (values) {
    return ((0, snabbdom_1.h)('div', values.map(function (value, index) {
        return (0, snabbdom_1.h)('div', { class: { 'card': true, 'p-2': true, 'm-2': true } }, [
            (0, snabbdom_1.h)('div', { class: { 'row': true } }, [
                (0, snabbdom_1.h)('div', { class: { 'col-md-8': true, 'text-decoration-line-through': value.status === Status.completed, } }, "".concat(value.title)),
                (0, snabbdom_1.h)('button', { class: { 'col-md-3': true, 'btn': true,
                        'btn-success': value.status === Status.todo,
                        'btn-warning': value.status === Status.completed },
                    on: {
                        click: function () { return updateStatus(index); }
                    }
                }, " ".concat(value.status === Status.completed ? Status.todo : Status.completed)),
            ]), (0, snabbdom_1.h)('button', { class: { 'btn': true, 'btn-danger': true, 'col-md-2': true }, on: { click: function () { return deleteTask(index); } } }, "Delete")
        ]);
    })));
};
var patch = (0, snabbdom_1.init)([snabbdom_1.styleModule, snabbdom_1.eventListenersModule, snabbdom_1.classModule, snabbdom_1.propsModule]);
patch(container, view());
