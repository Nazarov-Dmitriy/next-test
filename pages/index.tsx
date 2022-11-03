import Head from 'next/head'
import Form from '../components/Form'
import styled from '@emotion/styled';
import { css } from '@emotion/css'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useState, useEffect, SetStateAction } from 'react'
import OptionsGame from '../interfaces/OptionsGame'
import Game from '../interfaces/Game'
import { v4 as uuidv4 } from 'uuid';
import { random, data, handleChangeCount, handleClick } from '../Utils/function';



const Container = styled.main<{ bg: string }>`
width: 980px;
height: 810px;  
background-image: url(./images/${props => props.bg});
background-repeat: no-repeat;
background-size: cover;
margin: 0 auto;
`

const Main = styled.div`
display:flex;
flex-direction: column;
`

const Panel = styled.div<{ bg: string }>`
width: 886px;
height: 222px;
margin:0 45px;
border-radius: 50px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
background-image: url(./images/${props => props.bg});
display: flex;
align-items: center;
justify-content: center;
`

const PanelRound = styled.img`
width: 131px;
height: 131px;
`
const Direction = styled.div`
margin:0 50px 9px 0;
display:flex;
flex-direction: row-reverse;
`
const DirectionAscending = styled.div`
margin:0 0 9px 50px;
`

const DirectionIcon = styled.img`
width: 357px;
height: 70px;
`

const ContainerIcons = styled.div`
width: 886px;
height: 298PX;
margin: 130px 40px 50px 40px;
display:flex;
align-items: center;
justify-content: space-around;
`
const IconsDiv = styled.div`
position:relative`

const PanelDiv = styled.div`
position:relative`

const Icons = styled.img`
width: 145px;
height: 145px;`

const IconsPanel = styled.img`
width: 131px;
height: 131px;`

const Text = styled.p`
position: absolute;

font-family: 'Calibri';
font-style: normal;
font-weight: 400;
font-size: 56px;
line-height: 68px;
letter-spacing: 2px;
top:50%; 
left: 50%;
color: #FFFFFF;
-webkit-text-stroke-width: 3px;
-webkit-text-stroke-color: black;
margin-left: -30px;
margin-top: -34px;`

export default function Home() {
  const [optionsGame, setOptionsGame] = useState<OptionsGame>({
    count: 2,
    range: 0,
    direction: 'ascending',
    play: false,
  })
  const [game, setGame] = useState<Game>({
    bg: 'bg1.jpg',
    panel: 'panel1.png',
  })


  const columnsFromBackend = {
    [uuidv4()]: {
      name: "panel",
      items: game.initialArr

    },
    [uuidv4()]: {
      name: "list",
      items: game.iconsArr

    },
  };

  const onDragEnd = (result: DropResult, columns: { [x: string]: any; }, setColumns: { (value: SetStateAction<{ [x: string]: { name: string; items: { id: string; value: number; src?: string | undefined; }[] | undefined; }; }>): void; (arg0: any): void; }) => {

    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };


  useEffect(() => {
    if (optionsGame.play) {
      let valueImages = random(1, 4);
      setGame(opt => ({ ...opt, bg: `bg${valueImages}.jpg`, panel: `panel${valueImages}.png` }))
      data(optionsGame.count, optionsGame.range, optionsGame.direction, valueImages, setGame);

    }
  }, [optionsGame.play])


 

  const Game = () => {
    const [columns, setColumns] = useState(columnsFromBackend);

    return <>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        <Container bg={game.bg} >

          <Main>


            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <>{index === 0 &&
                  <div key={columnId}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <ContainerIcons
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {game.iconsArr?.map((item, idx) => {

                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <IconsDiv
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <Icons src={`./icons/${item.src}`} key={uuidv4()} />
                                        {optionsGame.range === 0 ? <Text >{item && String.fromCharCode(item.value)}</Text> : <Text>{item && item.value}</Text>}
                                      </IconsDiv>
                                    )
                                  }}
                                </Draggable>

                              )
                            })}
                            {provided.placeholder}
                          </ContainerIcons>
                        )
                      }}
                    </Droppable>
                  </div>
                }
                </>
              );
            })}
            {optionsGame.direction === 'ascending' ? <DirectionAscending><DirectionIcon src='./icons/up.png' /></DirectionAscending> :
              <Direction><DirectionIcon src='./icons/down.png' /></Direction>}

            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <>{index === 1 &&
                  <div key={columnId}> <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <Panel
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            bg={game.panel}
                          >
                            {game.initialArr?.map((item, idx) => {

                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {


                                    return (

                                      <PanelDiv ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        {item.src ? <IconsPanel src={`./icons/${item.src}`} key={uuidv4()} /> :
                                          <PanelRound src='./icons/roundpanels.svg' id={item.value.toString()} key={uuidv4()}></PanelRound>
                                        }

                                        {(optionsGame.range === 0) ? <Text >{item.src && item && String.fromCharCode(item.value)}</Text> : <Text>{item.src && item && item.value}</Text>}
                                      </PanelDiv>
                                    )
                                  }}
                                </Draggable>
                              )
                            })}
                            {provided.placeholder}
                          </Panel>
                        )
                      }}
                    </Droppable>
                  </div>
                  </div>
                }
                </>
              );
            })}


          </Main>
        </Container>
      </DragDropContext>
    </>
  }


  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Test Game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!optionsGame.play ?
        <Container bg='bg_opt.jpg' >
          <Form handleChangeCount={handleChangeCount} handleClick={handleClick} setOptionsGame={setOptionsGame} />
        </Container> :
        <Game></Game>}
    </div>
  )
}
