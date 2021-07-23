import {html, css, createGlobalStyles} from './lib'


const app = document.querySelector<HTMLDivElement>('#app');

interface Props {
    bg: string
    color: string,
    family: string
}

const useStyles = css<Props>`
    .myClass {
        background: ${(props)=>  props.bg};
        font-family: ${(props)=> props.family};
        padding: 10px;
        border-radius: 10px;
    }

    h1 {
        color: ${(props)=>  props.color};
    }

    p {
        color: ${(props)=>  props.color};
    }
`

const {classes} = useStyles({bg: "teal",color: 'white', family: 'arial'})

const otherUseStyles = css`
    .myClass {
        background: red;
    }
`

const { classes: otherClasses} = otherUseStyles()


app.innerHTML = html`
    <div class=${classes.myClass}>
        <h1 class=${otherClasses.myClass}>Hi there</h1>
        <p>lorum ipsum</p>
    </div>



`