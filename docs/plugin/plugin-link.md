# @aomao/plugin-link

Link plugin

## Installation

```bash
$ yarn add @aomao/plugin-link
```

`Vue` use

```bash
$ yarn add @aomao/plugin-link-vue
```

Add to engine

```ts
import Engine, {EngineInterface} from'@aomao/engine';
import Link from'@aomao/plugin-link';

new Engine(...,{ plugins:[Link] })
```

## Optional

### hot key

The default shortcut key is `mod+k`, and the default parameter is ["_blank"]

```ts
//Shortcut keys, key combination keys, args, execution parameters, [target?:string,href?:string,text?:string] Open mode: optional, default link: optional, default text: optional
hotkey?:string | {key:string,args:Array<string>};

//Use configuration
new Engine(...,{
    config:{
        "link":{
            //Modify shortcut keys
            hotkey:{
                key:"mod+k",
                args:["_balnk_","https://www.aomao.com","ITELLYOU"]
            }
        }
    }
 })
```

### Markdown

Support markdown by default, pass in `false` to close

Link plug-in markdown syntax is `[text](link address)` and it is triggered after pressing enter

```ts
markdown?: boolean;//enabled by default, false off
//Use configuration
new Engine(...,{
    config:{
        "link":{
            //Close markdown
            markdown:false
        }
    }
 })
```

## Command

Three parameters can be passed in [target?:string,href?:string,text?:string] Open mode: optional, default link: optional, default text: optional

```ts
//target:'_blank','_parent','_top','_self', href: link, text: text
engine.command.execute('link', '_blank', 'https://www.aomao.com', 'ITELLYOU');
//Use command to execute query current status, return boolean | undefined
engine.command.queryState('link');
```
