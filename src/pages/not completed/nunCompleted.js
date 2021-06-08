import React from "react";
import { withRouter } from "react-router-dom";
import LayOut from "../../components/LayOut/layOut";
import TodoList from "../../components/todolist/todolist";
import { Helmet } from "react-helmet";

function UnCompleted() {
  return (
    <div>
      <LayOut>
        <Helmet>
          <title>Check Todo</title>
        </Helmet>
        <TodoList title="UnCompleted"></TodoList>
      </LayOut>
    </div>
  );
}

export default withRouter(UnCompleted);
