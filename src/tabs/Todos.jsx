import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  onSubmit = e => {
    const todo = {
      id: nanoid(),
      text: e,
    };
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm searchName={this.onSubmit} />
        <Grid>
          {todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo todo={todo} index={index + 1} />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
