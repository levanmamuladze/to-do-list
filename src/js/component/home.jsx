import React, { useState, useEffect } from "react";

const Home = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/levan"
    );
    const data = await response.json();
    setTodoList(data);
  };

  const addTodo = async () => {
    if (newTodo !== "") {
      const checkLetter =
        newTodo.charAt(0).toUpperCase() + newTodo.slice(1).toLowerCase();
      const newTodoItem = { label: checkLetter , done: false};
      const check = todoList.find(todo => todo.label === newTodoItem.label);
      if (check) {
        alert("You can't add two same tasks!");
      } else {
        const response = await fetch(
          "https://assets.breatheco.de/apis/fake/todos/user/levan",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify([...todoList, newTodoItem])
          }
        );
        const data = await response.json();
        getTodos();
        setNewTodo("");
      }
    }
  };

  const deleteTodo = async (index) => {
    const newList = [...todoList];
    newList.splice(index, 1);
    
    const response = await fetch(
      `https://assets.breatheco.de/apis/fake/todos/user/levan`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newList)
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }else{
      setTodoList(newList);
    }
  };

 
  return (
    <div className=" container text-center justify-content-center container pt-5 main ">
      <h1>Add tasks to your To-Do-List</h1>
      <input
        value={newTodo}
        placeholder="Add a new todo"
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            addTodo();
          }
        }}
      />
      <ul className="mx-auto p-2">
        {todoList.map((todo, index) => {
          return (
            <li
              className="col-12 d-flex liDesing"
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="col-1 text-end">-</div>
              <div
                className="col-10 text-start"
                style={{ wordBreak: "break-all" }}
              >
                {todo.label}
              </div>
              <div className="col-1 text-end ">
                {hoveredIndex === index && (
                  <button
                    className="delete-button btn btn-danger button-icon fas fa-trash-alt p-1 "
                    onClick={() => {
                     deleteTodo(index);
                  
                    }}
                  ></button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
