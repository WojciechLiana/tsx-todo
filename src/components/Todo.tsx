import * as React from "react";
import {useState, Fragment} from "react";

export default function Todo(this: any): JSX.Element {

    type SubmitType = React.FormEvent<HTMLFormElement>;
    type InputType = React.ChangeEvent<HTMLInputElement>;

    interface ITodo {
        text: string,
        completed: boolean
    }

    const [value, setValue] = useState<string>('');
    const [todos, setTodos] = useState<ITodo[]>([]);

    function onInput(event: InputType): void {
        setValue(event.target.value);
    }

    function onSubmit(todo: string, e: SubmitType): void {
        e.preventDefault();
        setTodos(createTodos(todo));
        setValue("");
    }

    function createTodos(text: string): ITodo[] {
        return [
            ...todos, {text, completed: false}
        ];
    }

    function completeTodo(index: number): void {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    function deleteTodo(index: number): void {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    return (
        <Fragment>
            <form onSubmit={onSubmit.bind(this, value)}>
                <input type="text" value={value} required={true} onChange={onInput}/>
                <button type="submit"> Add todo</button>
            </form>
            <section>
                {todos.map((todo: ITodo, index: number) =>
                    <Fragment key={index}>
                        <div style={{textDecoration: todo.completed ? "line-through" : "none"}}>
                            {todo.text}
                        </div>
                        <button type="button" onClick={() => completeTodo(index)}>
                            {todo.completed ? 'incomplete' : 'complete'}
                        </button>
                        <button type="button" onClick={() => deleteTodo(index)}>&times;</button>
                    </Fragment>
                )}
            </section>
        </Fragment>
    );
}