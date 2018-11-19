# jscpd-badge-reporter

The badge reporter for [jscpd](https://github.com/kucherenko/jscpd).

Generate badges:

![jscpd-badge-green](badges/jscpd-badge-green.svg)
![jscpd-badge-green](badges/jscpd-badge-red.svg)

## Getting started

### Install

```bash
npm install jscpd@1.0.0-rc.5 jscpd-badge-reporter -g
```

### Usage

```bash
jscpd [...options] --reporters badge /path/to/source
```

### Options

```typescript

interface IBadgeOptions {
  color?: string, // color of badge, if threshold > current - green, if  threshold < current - red, no threshold provided - grey
  subject?: string, // label of the badge, default "Copy/Paste" 
  style?: string, // "flat" of undefined, default - undefined
  icon?: string, // 'data:image/svg+xml;base64,...' icon
  iconWidth?: number, // width of the icon
  path?: string, // path to badge, default is 'jscpd-badge.svg' in output folder
}

```

[MIT](LICENSE) © Andrey Kucherenko