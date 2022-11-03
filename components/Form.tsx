import styled from '@emotion/styled';
import { css } from '@emotion/css'

const Container = styled.div`
width: 699px;
height: 660px;
background: #FFFFFF;
margin: 0 auto;
border: solid 20px;
border-radius: 40px;
background-image: linear-gradient(white, white), linear-gradient(rgba(127, 117, 240, 1), rgba(16, 31, 50, 1));
border-image: linear-gradient(rgba(127, 117, 240, 1), rgba(16, 31, 50, 1)) 1;
background-origin: border-box;
background-clip: padding-box, border-box;
`

const Title = styled.h2`
font-family: 'Helvetica';
font-size: 32px;
text-align: center;
color: #423F45;
margin: 45px 0 15px 0;
`

const ButtonPlay = styled.button`
background: #38DF7A;
box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
border-radius: 20px;
height: 60px;
width: 260px;
font-family: 'Helvetica';
font-size: 32px;
line-height: 44px;
color: #FFFFFF;
border: 0;
cursor:pointer;`

const Button = styled.button`
height: 44px;
background: #FFD748;
border-radius: 20px;
font-family: 'Calibri';
font-size: 32px;
line-height: 39px;
color: #423F45;
border: 0;
padding: 0 24px;
cursor:pointer`

const Span = styled.span`
font-family: 'Calibri';
font-size: 24px;
line-height: 29px;
text-align: center;
color: #4F4B61;`

const List = styled.div`
width: 355px;
display: flex;
margin: 0 auto;
justify-content: space-between;`

const Input = styled.input`
width: 366px;
height: 21px;
background: #FFD748;
border-radius: 10px;
margin-bottom: 15px;
-webkit-appearance: none;
::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #104987;
    width: 23px;
    height: 23px;
    border-radius: 100%;
    cursor: pointer;
  }
`

export default function Form(props: any) {
    const { handleChangeCount, handleClick ,setOptionsGame} = props

    return (
        <Container >
            <Title >Кол-во предметов</Title>
            <div className={css({
                textAlign: 'center'
            })}>
                <List >
                    <Span >2</Span>
                    <Span >3</Span>
                    <Span >4</Span>
                    <Span >5</Span>
                </List>
                <Input onChange={(e) => handleChangeCount(e,setOptionsGame)} type="range" id="volume" min="2" max="5" step="1" defaultValue="2" name="count" />
            </div>
            <Title >Значения</Title>
            <div className={css({
                textAlign: 'center'
            })}>
                <List className={css({
                    width: '525px',
                })}>
                    <Span className={css({
                        marginRight: '15px',
                    })} >А</Span>
                    <Span className={css({
                        marginRight: '15px',
                    })}>9</Span>
                    <Span >19</Span>
                    <Span >50</Span>
                    <Span >99</Span>
                    <Span >999</Span>
                </List>
                <Input className={css({
                    width: '531px',
                })} onChange={(e) => handleChangeCount(e,setOptionsGame)} type="range" id="volume" min="0" max="5" step="1" defaultValue="0" name="range_value" />
            </div>
            <div className={css({
                display: 'flex',
                marginTop: '58px',
                padding: '0 59px',
                justifyContent: 'space-between',
            })}>
                <Button name="ascending" onClick={(e) => handleClick(e,setOptionsGame)}>По возрастанию</Button>
                <Button name="descending" onClick={(e) => handleClick(e,setOptionsGame)}>По убыванию</Button>
            </div>
            <div className={css({
                textAlign: 'center',
                marginTop: '97px',
            })}>
                <ButtonPlay name="play" onClick={(e) => handleClick(e,setOptionsGame)}>Играть</ButtonPlay>
            </div>
        </Container>
    )
}
