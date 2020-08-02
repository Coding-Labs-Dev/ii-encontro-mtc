const unique = (arr: Array<any>) => [...new Set(arr)];

export class BEM {
  readonly stylesheet: { [key: string]: string };

  readonly bemBase: string;

  constructor(stylesheet: { [key: string]: string }, bemBase: string) {
    this.stylesheet = stylesheet;
    this.bemBase = bemBase;
  }

  getStyles(classes: Array<string>): Array<string> {
    return classes.map((className) => this.stylesheet[className]);
  }

  blockName() {
    return `bem-${this.bemBase}`;
  }

  // b-Block
  b(...rest: any[]) {
    return this.getStyles(unique([this.blockName(), ...rest])).join(' ');
  }

  // b-Block__Element
  el(elName: string, ...rest: any[]) {
    return this.getStyles(
      unique([`${this.blockName()}__${elName}`, ...rest])
    ).join(' ');
  }

  // b-Block--Modifier
  mod(modName: string, ...rest: any[]) {
    return this.getStyles(
      unique([this.b(), `${this.blockName()}--${modName}`, ...rest])
    ).join(' ');
  }

  // b-Block__Element--Modifier
  elMod(elName: string, modName: string, ...rest: any[]) {
    return this.getStyles(
      unique([
        this.el(elName),
        `${this.blockName()}__${elName}--${modName}`,
        ...rest,
      ])
    ).join(' ');
  }
}

const bem = (stylesheet: { [key: string]: string }, bemBase: string) =>
  new BEM(stylesheet, bemBase);

export default bem;
