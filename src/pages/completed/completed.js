import React from "react";
import { withRouter } from "react-router-dom";
import LayOut from "../../components/LayOut/layOut";
import TodoList from "../../components/todolist/todolist";
import { Helmet } from "react-helmet";

function Completed() {
  return (
    <div>
      <LayOut>
        <Helmet>
          <title>Check Todo</title>
        </Helmet>
        <TodoList title="Completed"></TodoList>
      </LayOut>
    </div>
  );
}

export default withRouter(Completed);
