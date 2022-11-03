export default interface OptionsGame {
    bg: string
    panel: string
    arrValue?: number[]
    arrIcons?: [string]
    arrSteam?: [string]
    initialArr?: Array<{
        id: string
        value: number
        src?: string 
    }>
    iconsArr?: Array<{
        id: string
        value: number
        src: string
        stem?: string
    }>
}

