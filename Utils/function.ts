import { Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';
import OptionsGame from "../interfaces/OptionsGame";
import Game from '../interfaces/Game';

export function random(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function arrayValue(length: number, range: number): Array<number> {
    let arrRange = [[65, 90], [1, 9], [10, 19], [20, 49], [50, 99], [100, 999]]
    let arr: any = [];
    for (let i = 0; i <= length; i++) {
        let a = random(arrRange[range][0], arrRange[range][1])
        if (arr.includes(a)) {
            a = random(arrRange[range][0], arrRange[range][1]);
            i--;
        } else {
            arr.push(a)
        }
    }
    return arr;
}

interface ArrayIcons {
    arrIcons: [string]
    arrSteam: [string]
}


function arrayIcons(length: number, rangeImg: number): ArrayIcons {
    let arrIcons = [[1, 4], [1, 3], [1, 4], [1, 5]]
    let arr: any = [];
    let arrSteam: any = [];
    for (let i = 0; i <= length; i++) {
        let a = random(arrIcons[rangeImg - 1][0], arrIcons[rangeImg - 1][1]);
        if (rangeImg === 4) {
            arr.push(`flow${a}.svg`)
            arrSteam.push(`steam${a}.svg`)
            arr.sort()
            arrSteam.sort()
        } else {
            arr.push(`icon${rangeImg}${a}.svg`)
        }
    }

    return { arrIcons: arr, arrSteam: arrSteam }
}

function compareNumbers(a: number, b: number) {
    return a - b;
}
function compareNumbersM(a: number, b: number) {
    return b - a;
}

export function data(count: number, range: number, direction: string, valueImages: number, setGame: Dispatch<React.SetStateAction<Game>>): void {
    let valueArr = arrayValue(count, range);
    let arr = arrayIcons(count, valueImages);
    let initialValue = 0;
    let index = 0;
    let arrIcons: [string],
        arrSteam: [string],
        initialSrc: string,
        initialArr: Array<{ id:string, value: number, src?: string }>,
        arrSortValue: Array<number>,
        iconsArr: Array<{ id:string, value: number, src: string, stem?: string }>;

    if (direction === 'ascending') {
        initialValue = Math.min(...valueArr);
        arrSortValue = valueArr.sort(compareNumbers)
    } else {
        initialValue = Math.max(...valueArr);
        arrSortValue = valueArr.sort(compareNumbersM)
    }

    valueArr = valueArr.filter((el: number, idx: number) => {
        if (el === initialValue) {
            index = idx;
        } else {
            return el
        }
    })

    initialSrc = arr.arrIcons.splice(index, 1)[0]
    arr.arrSteam.splice(index, 1)
    arrIcons = arr.arrIcons
    arrSteam = arr.arrSteam

    initialArr = [{id: uuidv4(), value: initialValue, src: initialSrc }]

    arrSortValue.map((item, idx) => {
        if (idx !== 0) {
            initialArr.push({ id: uuidv4(), value: item })
        }
    })
    iconsArr = []
    arrIcons.forEach((item, idx) => {
        iconsArr.push({ id: uuidv4(), value: valueArr[idx], src: item, stem: arrSteam[idx] })
    })


    setGame((opt) => ({ ...opt, initialArr: initialArr, iconsArr: iconsArr }))


}

export const handleChangeCount = (e: React.SyntheticEvent<EventTarget>, setOptionsGame: Dispatch<React.SetStateAction<OptionsGame>>) => {
    let target = e.target as HTMLInputElement;
    if (target.name === 'count') {
        setOptionsGame(opt => ({ ...opt, count: +target.value }))
    }
    if (target.name === 'range_value') {
        setOptionsGame(opt => ({ ...opt, range: +target.value }))
    }
}

export const handleClick = (e: React.SyntheticEvent<EventTarget>, setOptionsGame: Dispatch<React.SetStateAction<OptionsGame>>) => {
    let target = e.target as HTMLInputElement;
    if (target.name === 'ascending' || target.name === 'descending') {
        setOptionsGame(opt => ({ ...opt, direction: target.name }))
    } else {
        setOptionsGame(opt => ({ ...opt, play: true }))
    }
}

