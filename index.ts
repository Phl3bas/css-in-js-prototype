import { html, css } from "./lib";

const app = document.querySelector<HTMLDivElement>("#app");

interface Props {
  bg: string;
  color: string;
  family: string;
}

const useStyles = css<Props>`
  .myClass {
    background: ${(props) => props.bg};
    font-family: ${(props) => props.family};
    padding: 10px;
    border-radius: 10px;
  }

  .myClass p {
    color: blue;
  }

  .heading {
    color: ${(props) => props.color};
  }

  .text {
    color: ${(props) => props.color};
  }
`;

const { classes } = useStyles({ bg: "teal", color: "white", family: "arial" });

const otherUseStyles = css`
  .myClass {
    color: white;
  }
`;

const { classes: otherClasses } = otherUseStyles();

const template = html`
  <div class=${classes.myClass}>
    <h1 class=${otherClasses.myClass}>Hi there</h1>
    <p>lorum ipsum</p>
    <button>click</button>
  </div>
`;

app.appendChild(template);
