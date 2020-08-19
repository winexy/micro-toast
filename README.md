# micro-toast

## Usage

```javascript
import { toast } from 'micro-toast';

toast('Hello, <strong>there</strong>!');
```

## Typings 

```ts
function toast(text: string, _config?: IConfig): void;

interface IConfig {
  duration?: number,
  classes?: string[],
  index?: string | number
};
```

## CSS
```css
.toast-container {}
.toast {}
.toast__dismiss {}
.--appear {}
.--remove {}
```