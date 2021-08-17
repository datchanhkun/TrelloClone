export const initialData = {
  boards: [
    {
      id: "board-1",
      columnOrder: ["column-1","column-2","column-3"],
      columns: [
        {
          id: "column-1",
          boardId: "board-1",
          title: "Todo Column",
          cardOrder: ["card-1", "card-2", "card-3", "card-4", "card-5", "card-6"],
          cards: [
            {
              id: "card-1",
              boardId: "board-1",
              columndId: "column-1",
              title: "Title Card 1",
              cover: "https://3.bp.blogspot.com/-xwqkErtKheA/VhkCiXV-CoI/AAAAAAAAGhY/FVr18SBQBOo/s0/github-logo.jpg"
            },
            { id: "card-2",boardId: "board-1",columndId: "column-1",title: "Title Card 2",cover: null },
            { id: "card-3",boardId: "board-1",columndId: "column-1",title: "Title Card 3",cover: null },
            { id: "card-4",boardId: "board-1",columndId: "column-1",title: "Title Card 4",cover: null },
            { id: "card-5",boardId: "board-1",columndId: "column-1",title: "Title Card 5",cover: null },
            { id: "card-6",boardId: "board-1",columndId: "column-1",title: "Title Card 6",cover: null }
          ]
        },
        {
          id: "column-2",
          boardId: "board-1",
          title: "Progress Column",
          cardOrder: ["card-7", "card-8", "card-9"],
          cards: [
            {
              id: "card-7",
              boardId: "board-1",
              columndId: "column-2",
              title: "Title Card 7",
              cover: null
            },
            { id: "card-8",boardId: "board-1",columndId: "column-2",title: "Title Card 8",cover: null },
            { id: "card-9",boardId: "board-1",columndId: "column-2",title: "Title Card 9",cover: null }
          ]
        },
        {
          id: "column-3",
          boardId: "board-1",
          title: "Done Column",
          cardOrder: ["card-10", "card-11", "card-12"],
          cards: [
            {
              id: "card-10",
              boardId: "board-1",
              columndId: "column-3",
              title: "Title Card 10",
              cover: null
            },
            { id: "card-11",boardId: "board-1",columndId: "column-3",title: "Title Card 11",cover: null },
            { id: "card-12",boardId: "board-1",columndId: "column-3",title: "Title Card 12",cover: null }
          ]
        }
      ]
    }
  ]
}
