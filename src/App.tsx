import "./App.css";
import { Text } from "./components/polymorphic/text";

// import { Person } from "./components/person";
// import { PersonList } from "./components/person-list";

// import { Heading } from "./components/heading";
// import { Oscar } from "./components/oscar";
// import { Greet } from "./components/greet";
// import { Status } from "./components/status";

// import { Button } from "./components/button";
// import { Input } from "./components/input";

// import { Container } from "./components/container";

// import { ThemeContextProvider } from "./components/context/theme-context";
// import { Box } from "./components/context/box";

// import { UserContextProvider } from "./components/context/user-context";
// import { User } from "./components/context/user";

// import { Counter } from "./components/class/counter";

// import { Private } from "./components/auth/private";
// import { Profile } from "./components/auth/profile";

// import { List } from "./components/generics/list";

// import { RandomNumber } from "./components/restriction/random-number";

// import { CustomButton } from "./components/html/button";

function App() {
  // const personName = {
  //   first: "Bruce",
  //   last: "Wayne"
  // }

  // const nameList = [
  //   {
  //     first: "Bruce",
  //     last: "Wayne"
  //   },
  //   {
  //     first: "Clark",
  //     last: "Kent"
  //   },
  //   {
  //     first: "Pricess",
  //     last: "Diana"
  //   }
  // ];

  return (
    <div className="App">
      {/* <Greet
        name="Anderson"
        messageCount={20}
        isLoggedIn={false}
      />
      <Person
        name={personName}
      />
      <PersonList
        names={nameList}
      /> */}

      {/* <Status
        status="error"
      />
      <Heading>Placeholder text</Heading>
      <Oscar>
        <Heading>Oscar goes to Leonardo Dicaprio!</Heading>
      </Oscar>
      <Greet
        name="Anderson"
        isLoggedIn={false}
      /> */}

      {/* <Button handleClick={(event, id) => {
        console.log("Button clicked", event, id);
      }} />
      <Input
        value=""
        handleChange={event => console.log(event)}
      /> */}

      {/* <Container
        styles={{ border: "1px solid black", padding: "1rem" }}
      /> */}

      {/* <ThemeContextProvider>
        <Box/>
      </ThemeContextProvider> */}

      {/* <UserContextProvider>
        <User/>
      </UserContextProvider> */}

      {/* <Counter
        message="The count value is"
      /> */}

      {/* <Private
        isLoggedIn={true}
        component={Profile}
      /> */}

      {/* <List
        items={["Batman", "Superman", "Wonder Woman"]}
        onClick={item => console.log(item)}
      />
      <List
        items={[1, 2, 3]}
        onClick={item => console.log(item)}
      /> */}
      {/* <List
        items={[
          {
            id: 1,
            first: "Bruce",
            last: "Wayne"
          },
          {
            id: 2,
            first: "Clark",
            last: "Kent"
          },
          {
            id: 3,
            first: "Princess",
            last: "Diana"
          }
        ]}
        onClick={item => console.log(item)}
      /> */}

      {/* <RandomNumber
        value={10}
        isPositive
      /> */}

      {/* <CustomButton
        variant="primary"
        onClick={() => {
          console.log("Clicked");
        }}
      >
        Primary Button
      </CustomButton> */}

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
    </div>
  );
}

export default App;