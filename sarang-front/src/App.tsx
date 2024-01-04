import React from "react";
import { latestBoardListMock } from "mocks";
import BoardItem from "components/BoardItem";
function App() {
  return (
    <>
      {latestBoardListMock.map((boardListItem) => (
        <BoardItem boardListItem={boardListItem}></BoardItem>
      ))}
    </>
  );
}

export default App;
