import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";

type Props = {} & TextInputProps;
const Input: React.FC<Props> = (props) => <TextInput {...props} />;

// Created a reusable Button component
type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

const Button: React.FC<ButtonProps> = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const Screen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState("");

  // useCallback to memoize the function and prevent re-creations
  const submitName = useCallback(() => {
    navigation.navigate("AnotherScreen", { name });
  }, [name, navigation]);

  return (
    <View style={styles.container}>
      <Input
        value={name}
        onChangeText={setName} // Directly using setName to avoid inline function
        style={styles.input}
      />
      <Button onPress={submitName} title="DONE" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Screen;

// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   TextInput,
//   TextInputProps,
//   TouchableOpacity,
//   Text,
// } from "react-native";
// type Props = {} & TextInputProps;
// const Input: React.FC<Props> = (props) => {
//   return <TextInput {...props} />;
// };
// const Screen: React.FC = ({ navigation }) => {
//   const [name, setName] = useState("");
//   const submitName = () => {
//     navigation.navigate("AnotherScreen", { name });
//   };
//   return (
//     <View style={styles.container}>
//       <Input value={name} onChangeText={(text) => setName(text)} />
//       <TouchableOpacity onPress={() => submitName()}>
//         <Text style={styles.title}>DONE</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   title: {
//     fontSize: 20,
//     color: "red",
//   },
// });
