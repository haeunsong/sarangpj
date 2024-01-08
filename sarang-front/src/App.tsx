import React from "react";
import { latestBoardListMock, top3BoardListMock } from "mocks";
import BoardItem from "components/BoardItem";
import Top3Item from "components/Top3Item";
function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      {top3BoardListMock.map((top3ListItem) => (
        <Top3Item top3ListItem={top3ListItem} />
      ))}
      {/* {latestBoardListMock.map((boardItem) => (
        <BoardItem boardListItem={boardItem} />
      ))} */}
    </div>
  );
}

export default App;
