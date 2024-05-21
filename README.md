# Por que TypeScript + React.js?

- Com verificação de tipo estático, você aprende sobre possíveis bugs enquanto digita o código, em vez de acessar o navegador e descobrir em tempo de execução.
- Fornece uma forma de descrever a forma de um objeto, fornecendo `melhor documentação` e `autocomplete`.
- Torna a manutenção e o refatoramento de códigos-fontes muito mais fácil.

# Type Inference

Ao passar o mouse em cima do componente, o editor de texto exibirá o `type inference` da função, indicando que ela `retorna um elemento JSX`. Graças a ele, a tipagem fica mais fácil e, em muitos casos, não é necessário adicionar TypeScript no código.

```
function App(): JSX.Element
```

# Typing Props

Para adicionar tipagem nas `props de um componente`, basta criar um tipo, que será igual a um objeto representando a `estrutura das props do componente`, e adicionar as propriedades, sendo a chave o nome da variável e o valor o tipo dela.

```
type GreetProps = {
    name: string;
}
```

Em seguida, na declaração da arrow function do componente Greet, é possível especificar o tipo das props do componente dentro dos parâmetros da função `adicionando dois-pontos e o tipo criado`.

```
export const Greet = (props: GreetProps) => {
    return (
        <div>
            <h2>Welcome, {props.name}! You have 10 unread messages</h2>
        </div>
    );
}
```

Um dos benefícios de construir o tipo das props é que, ao digitar `props` no código, o editor de texto gera um `autocomplete` com a variável presente no objeto.

```
props. (property) name: string
```

Além disso, `ao tentar passar como prop um valor com tipo diferente do determinado` no componente criado, uma `mensagem de erro` aparece em frente ao código.

```
name={10} Type 'number' is not assignable to type 'string'
```

# Types ou Interfaces?

Ao construir aplicações, é melhor utilizar types; e ao construir bibliotecas, interfaces.

# Objetos

Para passar um objeto como prop do componente, basta que o tipo contenha uma propriedade em que a chave seja o nome do objeto e o valor seja o objeto com os seus tipos.

```
const personName = {
    first: "Bruce",
    last: "Wayne"
}
```

```
type PersonProps = {
    name: {
        first: string;
        last: string;
    }
}
```

# Array de objetos

Para passar um array de objetos, basta criar uma propriedade semelhante à anterior, mas `adicionar [] ao final`.

```
const nameList = [
    {
        first: "Bruce",
        last: "Wayne"
    },
    {
        first: "Clark",
        last: "Kent"
    },
    {
        first: "Pricess",
        last: "Diana"
    }
];
```

```
type PersonListProps = {
    names: {
        first: string;
        last: string;
    }[];
}
```

# String literal types

No seguinte exemplo, o componente Status contém apenas uma prop que é do tipo string e, com base no valor dela, o valor da variável message é escolhido usando estruturas condicionais.

```
type StatusProps = {
    status: string;
}

export const Status = (props: StatusProps) => {
    let message;

    if(props.status === "loading") {
        message = "Loading...";
    } else if (props.status === "success") {
        message = "Data fetched successfully!";
    } else if (props.status === "error") {
        message = "Error fetching data";
    }

    return (
        <div>
            <h2>Status - {message}</h2>
        </div>
    );
}
```

No entanto, o desenvolvedor `pode escolher qualquer valor` para a prop status e, por conta disso, o valor de message `pode ser undefined`. Para obrigar que a string contenha o valor "loading", "success" ou "error", basta utilizar uma `união de string literals`, que consiste em adicionar as `strings separadas por pipes`.

```
type StatusProps = {
    status: "loading" | "success" | "error";
}
```

# Children

Caso o componente encapsule um texto em seu conteúdo, ou seja, entre a tag de abertura e de fechamento, é possível extrair ele com a `prop children`.

```
<Heading>Placeholder text</Heading>
```

```
type HeadingProps = {
    children: string;
}

export const Heading = (props: HeadingProps) => {
    return (
        <h2>{props.children}</h2>
    )
}
```

No entanto, caso seja necessário `encapsular outro componente dentro do componente`, é possível definir o tipo do children como de um `Node` utilizando o `tipo React.ReactNode` fornecido pela `devDependencie @types/react` (no React.js 17 para cima, não é necessário importar o react em cada componente).

```
<Oscar>
    <Heading>Oscar goes to Leonardo Dicaprio!</Heading>
</Oscar>
```

```
type OscarProps = {
    children: React.ReactNode;
}

export const Oscar = (props: OscarProps) => {
    return (
        <div>{props.children}</div>
    );
}
```

# Prop opcional

Caso seja necessário que uma prop seja opcional, basta adicionar uma `question mark (um ?)` ao final da chave na propriedade.

```
<Greet
    name="Anderson"
    isLoggedIn={false}
/>
```

```
type GreetProps = {
    name: string;
    messageCount?: number;
    isLoggedIn: boolean;
}
```

# Valor padrão

Para adicionar um `valor padrão` caso a prop não seja passada, basta utilizar uma `question mark` e desestruturar o messageCount atribuindo a ele o valor padrão de 0, por exemplo.

```
type GreetProps = {
    name: string;
    messageCount?: number;
    isLoggedIn: boolean;
}

export const Greet = (props: GreetProps) => {
    const { messageCount = 0 } = props;

    return (
        <div>
            <h2>
                {props.isLoggedIn
                    ? `Welcome, ${props.name}! You have ${messageCount} unread messages`
                    : "Welcome Guest"}
            </h2>
        </div>
    );
}
```

# Funções e eventos

Para passar funções como props, basta adicionar uma `arrow function` no type do componente, com ou sem parâmetros e retornando algo ou apenas void.

```
<Button handleClick={() => {
    console.log("Button clicked");
}} />
```

```
type ButtonProps = {
    handleClick: () => void;
}

export const Button = (props: ButtonProps) => {
    return (
        <button onClick={() => props.handleClick()}>Click</button>
    );
}
```

Também é possível passar `eventos como parâmetro da função`. Para tipar o `parâmetro event` em um `botão`, utiliza-se o `React.MouseEvent` fornecido pelo `@types/react`, e é possível ser mais específico indicando que o evento se trata do `click` de um botão adicionando o `generic type` \<HTMLButtonElement\>.

```
<Button handleClick={(event) => {
    console.log("Button clicked");
}} />
```

```
type ButtonProps = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: ButtonProps) => {
    return (
        <button onClick={(event) => props.handleClick(event)}>Click</button>
    );
}
```

No caso do evento de um `elemento de input`, basta utilizar o `evento ChangeEvent`, especificando que se trata de um input com o `generic type` \<HTMLInputElement\>. Note que não importa se o evento será passado como uma prop ou como parâmetro de uma função, ambas as formas são permitidas.

```
<Input
    value=""
    handleChange={event => console.log(event)}
/>
```

```
type InputProps = {
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
    }

    return (
        <input
            type="text"
            value={props.value}
            onChange={handleInputChange}
        />
    );
}
```

# CSS props

Caso a prop passada seja um `objeto` contendo `propriedades CSS` que serão adicionado a um elemento, é possível adicionar um tipo já `pronto` chamado de `React.CSSProperties`. Na propriedade, a chave pode ser uma string e o valor pode ser um número ou uma string, o que, no entanto, inclui `qualquer string`, até o que `não é valido no CSS`, por isso o time de desenvolvimento do React.js adicionou o `tipo CSS` na biblioteca.

```
<Container
    styles={{ border: "1px solid black", padding: "1rem" }}
/>
```

```
type ContainerProps = {
    styles: React.CSSProperties;
}

export const Container = (props: ContainerProps) => {
    return (
        <div style={props.styles}>
            Text content goes here
        </div>
    );
}
```

# Prop type e dicas

Nos componentes, em vez de utilizar o objeto props para acessar as diferentes props passadas para o componente, é possível `desestruturar o objeto`.

```
export const Input = ({ value, handleChange }: InputProps) => {
    
}
```

Em componentes volumosos que contenham vários tipos, é uma boa prática `separar o tipo em um arquivo separado`, exportá-lo e importá-lo no arquivo do componente.

```
export type PersonProps = {
    name: {
        first: string;
        last: string;
    }
}
```

```
import { PersonProps } from "./person.types";

export const Person = (props: PersonProps) => {
    return <div>{props.name.first} {props.name.last}</div>
}
```

Dentro do arquivo de tipos separado, uma boa prática é `extrair o tipo name`, que contém duas strings, em um `tipo diferente`, utilizá-lo no `tipo PersonProps` e `exportá-lo` para utilizar no `tipo PersonListProps` como um array de objetos do `tipo Name`.

```
export type Name = {
    first: string;
    last: string;
}

export type PersonProps = {
    name: Name;
}
```

```
import { Name } from "./person.types";

type PersonListProps = {
    names: Name[];
}
```

# Typing hooks - useState

`Não é necessário` adicionar tipagem ao useState por conta do `type inference`, que define o tipo do estado com base no `valor inicial`. Caso outro tipo além de boolean tente ser atribuído ao estado isLoggedIn, um erro é exibido assim como em um objeto ou variável tipada.

```
import { useState } from "react";

export const LoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <div>User is {isLoggedIn ? "logged in" : "logged out"}</div>
        </div>
    );
}
```

# Typing hooks - useState future value

Ao adicionar um valor inicial de null para o estado, o type inference tipará o estado como null, impossibilitando, por exemplo, utilizar um objeto como argumento da função setter. Para definir que `futuramente` o tipo da variável será do `tipo User`, basta adicionar `colchetes angulares`, também chamada de `generic type`, e definir dois tipos dentro deles: AuthUser e null, separando-os entre pipes, notação conhecida como `union types`. Como o valor do estado pode ser null por ser o valor inicial dele, é necessário utilizar o `operador optional chaining` ao tentar exibir o valor do estado.

```
import { useState } from "react";

type AuthUser = {
    name: string;
    email: string;
}

export const User = () => {
    const [user, setUser] = useState<AuthUser | null>(null);

    const handleLogin = () => {
        setUser({
            name: "Anderson",
            email: "anderkaiti@gmail.com"
        });
    }

    const handleLogout = () => {
        setUser(null);
    }

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <div>User name is {user?.name}</div>
            <div>User email is {user?.email}</div>
        </div>
    );
}
```

# Typing hooks - useState type assertion

Caso haja a `certeza` de que o `estado user` seja do tipo `AuthUser`, é possível utilizar o `type assertion` para definir que o user sempre será do tipo AuthUser e não null. Trata-se de realizar a troca do null por um `objeto vazio` e utilizar `as AuthUser` depois dele, permitindo acessar o name e o email do usuário `sem utilizar o operador optional chaining`.

```
import { useState } from "react";

type AuthUser = {
    name: string;
    email: string;
}

export const User = () => {
    const [user, setUser] = useState<AuthUser>({} as AuthUser);
    const handleLogin = () => {
        setUser({
            name: "Anderson",
            email: "anderkaiti@gmail.com"
        });
    }

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <div>User name is {user.name}</div>
            <div>User email is {user.email}</div>
        </div>
    );
}
```

# Typing hooks - useReducer

No hook useReducer, é necessário tipar os `parâmetros state` e `action` de forma semelhante a objetos. Após isso, o próprio `TypeScript infere` qual é o tipo do `state` e da `função dispatch`.

```
import { useReducer } from "react";

type CounterState = {
    count: number;
}

type CounterAction = {
    type: string;
    payload: number;
}

const initialState: CounterState = { count: 0 }

function reducer(state: CounterState, action: CounterAction) {
    switch(action.type) {
        case "increment":
            return {
                count: state.count + action.payload
            }
        case "decrement":
            return {
                count: state.count - action.payload
            }
        default:
            return state;
    }
}

export const Counter = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({
                type: "increment",
                payload: 10
            })}>
                Increment 10
            </button>
            <button onClick={() => dispatch({
                type: "decrement",
                payload: 10
            })}>
                Decrement 10
            </button>
        </>
    );
}
```

# Typing hooks - useReducer strict action types

Para restringir os tipos do objeto action, é possível utilizar template literal com union type.

```
type CounterAction = {
    type: "increment" | "decrement";
    payload: number;
}
```

Caso uma das propriedades do action não seja adicionada, como o payload, por exemplo, uma mensagem indicando que ele é possivelmente undefined será exibida. Uma solução seria adicionar uma question mark ao final da chave da propriedade payload, `mas a mesma mensagem anterior` seria exibida ao tentar acessar a `propriedade action.payload`. Para evitar essa situação, basta criar dois tipos, em que `um aceita o payload`, junto com a propriedade type com os valores "increment" e "decrement", e o outro `apenas aceitaria a propriedade type` com o valor "reset". Após a criação de ambos os tipos, o `tipo CounterAction receberia uma union type dos dois tipos`.

```
type UpdateAction = {
    type: "increment" | "decrement",
    payload: number;
}

type ResetAction = {
    type: "reset"
}

type CounterAction = UpdateAction | ResetAction;
```

# Typing hooks - useContext

Ao utilizar o useContext em uma situação em que o `valor do contexto já é conhecido`, ou seja, ele não é inicialmente null nem vazio, o TypeScript fará um `type inference` no `tipo do contexto`, não sendo necessário realizar `nenhuma tipagem` por conta disso.

```
export const theme = {
    primary: {
        main: "#3f51b5",
        text: "#fff"
    },
    secondary: {
        main: "#f50057",
        text: "#fff"
    }
}
```

```
import { createContext } from "react";
import { theme } from "./theme";

type ThemeContextProviderProps = {
    children: React.ReactNode;
}

export const ThemeContext = createContext(theme);

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
}
```

```
import { useContext } from "react"
import { ThemeContext } from "./theme-context"

export const Box = () => {
    const theme = useContext(ThemeContext);

    return (
        <div
            style={{
                backgroundColor: theme.primary.main,
                color: theme.primary.text
            }}
        >
            Theme context
        </div>
    );
}
```

# Typing hooks - useContext future value

Caso o `valor inicial` do contexto seja `null`, basta adicionar `union types` nos tipos do contexto, indicando que futuramente ele será um `objeto` com o nome e email do usuário.

```
import { useState, createContext } from "react";

export type AuthUser = {
    name: string;
    email: string;
}

type UserContextType = {
    user: AuthUser | null;
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

type UserContextProviderProps = {
    children: React.ReactNode;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    
    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </UserContext.Provider>
    );
}
```

```
import { useContext } from "react";
import { UserContext } from "./user-context";

export const User = () => {
    const userContext = useContext(UserContext);

    const handleLogin = () => {
        if(userContext) {
            userContext.setUser({
                name: "Anderson",
                email: "anderkaiti@gmail.com"
            });
        }
    }
    const handleLogout = () => {
        if(userContext) {
            userContext.setUser(null);
        }
    }

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <div>User name is {userContext?.user?.name}</div>
            <div>User email is {userContext?.user?.email}</div>
        </div>
    );
}
```

```
<UserContextProvider>
    <User/>
</UserContextProvider>
```

No entanto, caso o valor inicial seja null, é necessário realizar várias verificações no componente. Uma solução é utilizar type assertion, inicializando o valor do contexto como um objeto vazio do tipo UserContextType.

```
export const UserContext = createContext({} as UserContextType);
```

# Typing hooks - useRef

Ao utilizar o `hook useRef`, o argumento passado como `initialValue` normalmente é `null` e o atributo ref, que é adicionado ao elemento, conterá o `valor da referência retornada pelo hook`. No entanto, ao utilizar qualquer método ou propriedade da referência criada, é necessário adicionar uma `checagem` utilizando `optional chaining`, pois o `valor inicial` do inputRef é `null`, e adicionar um `generic type` com o tipo do `elemento HTML` para que o TypeScript reconheça o `tipo de referência` que o inputRef armazenará (assim a propriedade focus pode ser utilizada sem problemas).

```
import { useRef, useEffect } from "react";

export const DomRef = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div>
            <input
                type="text"
                ref={inputRef}
            />
        </div>
    );
}
```

Caso haja a certeza de que a referência nunca será nula ao tentar acessá-la, é possível adicionar o `non-null assertion` ao invocar o useRef, que se trata de `adicionar uma exclamação depois do null`, e retirar o optional chaning.

```
const inputRef = useRef<HTMLInputElement>(null!);

useEffect(() => {
    inputRef.current.focus();
}, []);
```

# Class components

Para realizar a tipagem de class components, basta utilizando o type annotation na classe Component com os tipos do objeto props e do estado presente.

```
import { Component } from "react";

type CounterProps = {
    message: string;
}

type CounterState = {
    count: number;
}

export class Counter extends Component<CounterProps, CounterState> {
    state = {
        count: 0
    }
    
    handleClick = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Increment</button>
                {this.props.message} {this.state.count}
            </div>
        );
    }
}
```

Caso não hajam props, basta trocar o tipo por um objeto.

```
export class Counter extends Component<{}, CounterState>
```

E caso não haja um estado, basta remover o tipo do estado.

```
export class Counter extends Component<CounterProps>
```

# Component prop

É possível passar um `componente` como uma `prop` de outro componente. Para isso, utiliza-se o `tipo ComponentType` fornecido pelo `@types/react`, sendo possível especificar o tipo do componente com o tipo ProfileProps. Também é possível passar a prop em `lower case renomeando a propriedade` durante a desestruturação do objeto props.

```
<Private
    isLoggedIn={true}
    component={Profile}
/>
```

```
export type ProfileProps = {
    name: string;
}

export const Profile = ({ name }: ProfileProps) => {
    return <div>Private Profile Component. Name is {name}</div>
}
```

```
import { Login } from "./login";
import { ProfileProps } from "./profile";

type PrivateProps = {
    isLoggedIn: boolean;
    component: React.ComponentType<ProfileProps>;
}

export const Private = ({ isLoggedIn, component: Component }: PrivateProps) => {
    if(isLoggedIn) {
        return <Component name="Anderson" />
    } else {
        return <Login/>
    }
}
```

# Generic props

Caso haja a necessidade de passar vários arrays de diferentes tipos de dados, é possível garantir que a `função retorne o mesmo tipo de dados que foi passado no array` utilizando `generics`. Para isso, basta adicionar um `<T>` no nome do `tipo ListProps`, trocar os tipos das propriedades por `T` e especificar que a função recebe um tipo genérico `<T>`.

```
type ListProps<T> = {
    items: T[];
    onClick: (value: T) => void;
}

export const List = <T extends { id: number }>({
    items,
    onClick
}: ListProps<T>) => {
    return (
        <div>
            <h2>List of items</h2>
            {items.map((item, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => onClick(item)}
                    >
                        {item.id}
                    </div>
                );
            })}
        </div>
    );
}
```

# Restricting props

Para restringir que outras props sejam passadas caso uma já esteja sendo passada, basta utilizar o `tipo never`. No seguinte exemplo, o `tipo RandomNumberType` foi criado com a propriedade value e mais outros três tipos foram criados utilizando como base o tipo RandomNumberType. Nos três tipos criados, utiliza-se o `tipo never` para `restringir o restante das propriedades` caso uma já seja inserida. Ao final, no tipo RandomNumberProps, utiliza-se o `union types`.

```
<RandomNumber
    value={10}
    isPositive
/>
```

```
type RandomNumberType = {
    value: number;
}

type PositiveNumber = RandomNumberType & {
    isPositive: boolean;
    isNegative?: never;
    isZero?: never;
}

type NegativeNumber = RandomNumberType & {
    isNegative: boolean;
    isPositive?: never;
    isZero?: never;
}

type Zero = RandomNumberType & {
    isZero: boolean;
    isPositive?: never;
    isNegative?: never;
}

type RandomNumberProps = PositiveNumber | NegativeNumber | Zero;

export const RandomNumber = ({
    value,
    isPositive,
    isNegative,
    isZero
}: RandomNumberProps) => {
    return (
        <div>
            {value} {isPositive && "positive"} {isNegative && "negative"}{" "}
            {isZero && "zero"}
        </div>
    )
}
```

# Wrapping HTML Elements

Caso seja necessário criar algum componente para ser utilizado no `layout` do site, como um botão ou um input, é possível adicionar a `tipagem necessária` e inserir todas as `propriedades padrão de um elemento button`. No seguinte exemplo, apenas a `prop variant foi definida` e o restante é determinado pelo `tipo React.ComponentProps`, onde foi especificado que os `atributos` seriam do `elemento genérico "button"`. Ao receber as props no componente, é possível `desestruturar as props variant e children` e `expandir a prop ...rest`, que contém qualquer outro atributo comum em um butão, no elemento button.

```
<CustomButton
    variant="primary"
    onClick={() => {
        console.log("Clicked");
    }}
>
    Primary Button
</CustomButton>
```

```
type ButtonProps = {
    variant: "primary" | "secondary";
} & React.ComponentProps<"button">;

export const CustomButton = ({ variant, children, ...rest }: ButtonProps) => {
    return (
        <button
            className={`class-with-${variant}`}
            {...rest}
        >{children}</button>
    );
}
```

No entanto, a prop children tem a tipagem React.ReactNode, então é possível passar uma div para children.

```
<CustomButton
    variant="primary"
    onClick={() => {
        console.log("Clicked");
    }}
>
    <div>Primary Button</div>
</CustomButton>
```

Caso seja necessário definir que a `prop children` seja apenas do tipo string especificando `children: string`, ainda haverá um problema, pois o children será do tipo `string & React.ReactNode`, haja vista que ocorre uma `interseção` do tipo com o `React.ComponentProps<"button">`. Para `omitir a prop children`, é possível utilizar o `utilitário Omit<>`, passando o tipo do botão primeiro e o tipo a ser omitido em segundo para criar um novo `tipo sem a prop children`.

```
type ButtonProps = {
    variant: "primary" | "secondary";
    children: string;
} & Omit<React.ComponentProps<"button">, "children">;
```

# Extracting a Components Prop Types

Caso seja necessário utilizar as `mesmas props de um outro componente`, é possível utilizar o `tipo React.ComponentProps<>`, passando o `typeof` do `componente Greet` entre os `colchetes angulares`.

```
import { Greet } from "../greet";

export const CustomComponent = (props: React.ComponentProps<typeof Greet>) => {
    return (
        <div>
            {props.name}
        </div>
    );
}
```

# Polymorphic Components

Caso seja necessário que o `elemento` de um componente seja definido por meio de props, é possível definir uma prop cujo tipo é o tipo `genérico T` que `herda o tipo React.ElementType`. No seguinte exemplo, o `tipo TextProps`, que contém um tipo genérico E que também `herda o tipo React.ElementType`, é criado a partir da `interseção` entre os tipo `TextOwnProps` e `React.ComponentProps<E>`, com exceção das propriedades do tipo `TextOwnProps` que são passadas com o `operador keyof` (o tipo de todas as chaves do tipo TextOwnProps).

```
<Text as="h1" size="lg">Heading</Text>
<Text as="p" size="md">Paragraph</Text>
<Text
    as="label"
    htmlFor="someId"
    size="sm"
    color="secondary"
>
    Label
</Text>
```

```
type TextOwnProps<E extends React.ElementType> = {
    size?: "sm" | "md" | "lg";
    color?: "primary" | "secondary";
    children: React.ReactNode;
    as?: E;
}

type TextProps<E extends React.ElementType> = TextOwnProps<E>
    & Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>;

export const Text = <E extends React.ElementType = "div">({ size, color, children, as }: TextProps<E>) => {
    const Component = as || "div";
    
    return (
        <Component
            className={`class-width-${size}-${color}`}
        >
            {children}
        </Component>
    );
}
```